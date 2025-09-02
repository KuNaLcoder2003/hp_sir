"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../generated/prisma");
const zoom_1 = require("../functions/zoom");
const crypto_hash_1 = require("crypto-hash");
const prisma = new prisma_1.PrismaClient();
const meetings_router = express_1.default.Router();
meetings_router.get('/weeks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req reached');
        const weeks = yield prisma.week.findMany({});
        res.status(200).json({
            weeks: weeks
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.get('/bookingDetails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const week = yield prisma.week.findFirst({
            where: {
                completed: false
            }
        });
        if (!week) {
            res.status(403).json({
                message: 'All slots are booked'
            });
            return;
        }
        const slots = yield prisma.slot.findMany({
            where: {
                week_id: week.id
            }
        });
        if (!slots) {
            res.status(403).json({
                message: 'No slots added'
            });
            return;
        }
        res.status(200).json({
            week: week,
            slots: slots
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.post('/postNewWeek', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_week_details = req.body.details;
        if (!new_week_details) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const existing = yield prisma.week.findFirst({
            where: {
                completed: false
            }
        });
        if (existing) {
            res.status(403).json({
                message: 'A Current week is not completd yet , first mark it as completed'
            });
            return;
        }
        const new_week = yield prisma.week.create({
            data: {
                week_name: new_week_details.week_name,
                completed: false
            }
        });
        if (!new_week) {
            res.status(403).json({
                message: 'Error creating new Week'
            });
            return;
        }
        res.status(200).json({
            message: 'Sucessfully added week',
            valid: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.post('/slots/:weekId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weekId = req.params.weekId;
        if (!weekId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const slots = req.body.slots;
        if (!slots || slots.length == 0) {
            res.status(400).json({
                message: 'Invalid slots'
            });
            return;
        }
        const results = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const newSlots = yield Promise.all(slots.map((slot) => __awaiter(void 0, void 0, void 0, function* () {
                const existing = yield tx.slot.findFirst({
                    where: {
                        day: slot.day,
                        time: slot.time
                    }
                });
                if (existing) {
                    return existing;
                }
                else {
                    return yield tx.slot.create({
                        data: {
                            week_id: Number(weekId),
                            week_number: Number(weekId),
                            day: slot.day,
                            time: slot.time,
                            slot_booked: false,
                            duration: 15
                        }
                    });
                }
            })));
            return newSlots;
        }));
        if (results.length == 0 || !results) {
            res.status(403).json({
                message: 'Unable to add slots'
            });
            return;
        }
        res.status(200).json({
            message: 'Sucessfully created time slots',
            slots: results
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.get('/doubtDetails/:doubtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doubtId = req.params.doubtId;
        const doubt = yield prisma.doubts.findFirst({
            where: {
                id: Number(doubtId)
            }
        });
        if (!doubt) {
            res.status(400).json({
                message: 'No doubt exixts'
            });
            return;
        }
        res.status(200).json({
            doubt: doubt
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.get('/weekDetails/:weekId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weekId = req.params.weekId;
        if (!weekId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const week = yield prisma.week.findFirst({
            where: {
                id: Number(weekId)
            }
        });
        if (!week) {
            res.status(403).json({
                message: 'Week does not exixts'
            });
            return;
        }
        const slots = yield prisma.slot.findMany({
            where: {
                week_id: week.id
            }
        });
        if (!slots) {
            res.status(403).json({
                message: 'Unable to fetch slots'
            });
            return;
        }
        const ids = slots.map(slot => {
            return slot.id;
        });
        const doubts = yield prisma.doubts.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        if (!doubts) {
            res.status(403).json({
                message: 'Unable to fetch slots'
            });
            return;
        }
        res.status(200).json({
            week,
            slots,
            doubts
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.post('/doubtRequest/:slotId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doubt_details = req.body.details;
        const slotId = req.params.slotId;
        if (!doubt_details || !slotId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const exists = yield prisma.doubts.findFirst({
            where: {
                user_email: doubt_details.user_email,
                completed: false
            }
        });
        if (exists) {
            res.status(403).json({
                message: 'A doubt query already exists'
            });
            return;
        }
        const hashed_id = yield (0, crypto_hash_1.sha256)(`${doubt_details.user_email} ${doubt_details.slot_id}`);
        if (!hashed_id) {
            res.status(403).json({
                message: 'Error generating doubt query'
            });
            return;
        }
        const new_doubt = yield prisma.doubts.create({
            data: {
                slot_id: Number(slotId),
                user_email: doubt_details.user_email,
                date: doubt_details.date,
                doubt_type: doubt_details.doubt_type,
                class: doubt_details.class,
                completed: false,
                request_accepted: false,
                hashed_id: hashed_id
            }
        });
        if (!new_doubt) {
            res.status(403).json({
                message: 'Error creating doubt query'
            });
            return;
        }
        res.status(200).json({
            message: 'Successfully created doubt , please wait while the admin approves it',
            valid: true,
            doubtId: new_doubt.hashed_id,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.post('/createMeetingLink/:doubtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doubtId = req.params.doubtId;
        if (!doubtId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        let obj;
        const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const doubt_entry = yield prisma.doubts.findFirst({
                where: {
                    hashed_id: doubtId
                }
            });
            if (!doubt_entry || doubt_entry.completed) {
                res.status(400).json({
                    message: 'Doubt entry does not exists'
                });
                return false;
            }
            const meeting_deatils = yield (0, zoom_1.generateZoomMeeting)(['kunalindia59@gmail.com', doubt_entry.user_email], 'kunalindia59@gmail.com', 'Kunal Singh', doubt_entry.date, 15, `${doubt_entry.doubt_type}-${doubt_entry.class}`);
            if (!meeting_deatils || !meeting_deatils.id) {
                return false;
            }
            const meeting = yield tx.meeting.findFirst({
                where: {
                    doubt_id: doubt_entry.id
                }
            });
            if (meeting) {
                res.status(403).json({
                    message: 'Meeting for doubt already exists'
                });
                return false;
            }
            const new_meeting = yield prisma.meeting.create({
                data: {
                    meeting_id: `${meeting_deatils.id}`,
                    joinTime: meeting_deatils.start_time,
                    join_url: meeting_deatils.join_url,
                    start_url: meeting_deatils.start_url,
                    meeting_password: meeting_deatils.password,
                    doubt_id: doubt_entry.id,
                    slot_id: doubt_entry.slot_id,
                    completed: false,
                    user_email: doubt_entry.user_email,
                    date: doubt_entry.date
                }
            });
            obj = new_meeting;
            const updated = yield prisma.doubts.update({
                where: {
                    id: Number(doubt_entry.id)
                },
                data: {
                    request_accepted: true
                }
            });
            if (!updated) {
                res.status(403).json({
                    message: 'Unable to permit doubt query'
                });
            }
            if (!new_meeting) {
                res.status(403).json({
                    message: 'Error generating meeting'
                });
                return false;
            }
            return true;
        }));
        if (!result) {
            res.status(400).json({
                message: 'Error generating meeting link'
            });
        }
        res.status(200).json({
            message: 'Successfully created meeting',
            meeting: obj
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.get('/meetingDetails/:doubtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doubtId = req.params.doubtId;
        if (!doubtId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const doubt = yield prisma.doubts.findFirst({
            where: {
                id: Number(doubtId)
            }
        });
        if (!doubt) {
            res.status(404).json({
                message: 'Doubt not found'
            });
            return;
        }
        const meeting = yield prisma.meeting.findFirst({
            where: {
                doubt_id: doubt.id,
            }
        });
        if (!meeting) {
            res.status(404).json({
                message: 'No meetings found'
            });
            return;
        }
        res.status(200).json({
            meeting: meeting
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}));
meetings_router.get('/slots', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const week = yield prisma.week.findFirst({
            where: {
                completed: false
            }
        });
        if (!week) {
            res.status(400).json({
                message: 'No availabilty for current weak'
            });
            return;
        }
        const slots = yield prisma.slot.findMany({
            where: {
                week_id: week === null || week === void 0 ? void 0 : week.id,
                slot_booked: false,
            }
        });
        if (!slots || slots.length == 0) {
        }
    }
    catch (error) {
    }
}));
exports.default = meetings_router;
