import express from "express"
import { PrismaClient } from "../../generated/prisma";
import { generateZoomMeeting } from "../functions/zoom";
import { sha256 } from "crypto-hash";
const prisma = new PrismaClient()
const meetings_router = express.Router()

interface Slot {
    week_id: Number
    day: string
    time: string
    duration: Number
}

interface Doubt {
    user_email: string,
    class: string,
    doubt_type: string,
    date: Date,
    slot_id: number
}

meetings_router.get('/weeks', async (req: any, res: express.Response) => {

    try {
        console.log('req reached')
        const weeks = await prisma.week.findMany({})
        res.status(200).json({
            weeks: weeks
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})

meetings_router.get('/bookingDetails', async (req: any, res: express.Response) => {
    try {
        const week = await prisma.week.findFirst({
            where: {
                completed: false
            }
        })
        if (!week) {
            res.status(403).json({
                message: 'All slots are booked'
            })
            return
        }
        const slots = await prisma.slot.findMany({
            where: {
                week_id: week.id
            }
        })
        if (!slots) {
            res.status(403).json({
                message: 'No slots added'
            })
            return
        }
        res.status(200).json({
            week: week,
            slots: slots
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})



meetings_router.post('/postNewWeek', async (req: any, res: express.Response) => {
    try {
        const new_week_details = req.body.details
        if (!new_week_details) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const existing = await prisma.week.findFirst({
            where: {
                completed: false
            }
        })
        if (existing) {
            res.status(403).json({
                message: 'A Current week is not completd yet , first mark it as completed'
            })
            return
        }
        const new_week = await prisma.week.create({
            data: {
                week_name: new_week_details.week_name,
                completed: false
            }
        })
        if (!new_week) {
            res.status(403).json({
                message: 'Error creating new Week'
            })
            return
        }
        res.status(200).json({
            message: 'Sucessfully added week',
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})

meetings_router.post('/slots/:weekId', async (req: any, res: express.Response) => {
    try {
        const weekId = req.params.weekId
        if (!weekId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const slots: Slot[] = req.body.slots as Slot[]
        if (!slots || slots.length == 0) {
            res.status(400).json({
                message: 'Invalid slots'
            })
            return
        }

        const results = await prisma.$transaction(async (tx) => {
            const newSlots = await Promise.all(
                slots.map(async (slot) => {
                    const existing = await tx.slot.findFirst({
                        where: {
                            day: slot.day,
                            time: slot.time
                        }
                    })
                    if (existing) {
                        return existing
                    } else {
                        return await tx.slot.create({
                            data: {
                                week_id: Number(weekId),
                                week_number: Number(weekId),
                                day: slot.day,
                                time: slot.time,
                                slot_booked: false,
                                duration: 15
                            }
                        })
                    }
                })
            );

            return newSlots;
        });
        if (results.length == 0 || !results) {
            res.status(403).json({
                message: 'Unable to add slots'
            })
            return
        }
        res.status(200).json({
            message: 'Sucessfully created time slots',
            slots: results
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})

meetings_router.get('/doubtDetails/:doubtId', async (req: express.Request, res: express.Response) => {
    try {
        const doubtId = req.params.doubtId;
        const doubt = await prisma.doubts.findFirst({
            where: {
                id: Number(doubtId)
            }
        })
        if (!doubt) {
            res.status(400).json({
                message: 'No doubt exixts'
            })
            return
        }
        res.status(200).json({
            doubt: doubt
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})

meetings_router.get('/weekDetails/:weekId', async (req: any, res: express.Response) => {
    try {
        const weekId = req.params.weekId
        if (!weekId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const week = await prisma.week.findFirst({
            where: {
                id: Number(weekId)
            }
        })

        if (!week) {
            res.status(403).json({
                message: 'Week does not exixts'
            })
            return
        }

        const slots = await prisma.slot.findMany({
            where: {
                week_id: week.id
            }
        })
        if (!slots) {
            res.status(403).json({
                message: 'Unable to fetch slots'
            })
            return
        }

        const ids = slots.map(slot => {
            return slot.id
        })
        const doubts = await prisma.doubts.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        if (!doubts) {
            res.status(403).json({
                message: 'Unable to fetch slots'
            })
            return
        }
        res.status(200).json({
            week,
            slots,
            doubts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})

meetings_router.post('/doubtRequest/:slotId', async (req: express.Request, res: express.Response) => {
    try {
        const doubt_details: Doubt = req.body.details as Doubt
        const slotId = req.params.slotId;
        if (!doubt_details || !slotId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }

        const exists = await prisma.doubts.findFirst({
            where: {
                user_email: doubt_details.user_email,
                completed: false
            }
        })

        if (exists) {
            res.status(403).json({
                message: 'A doubt query already exists'
            })
            return
        }
        const hashed_id = await sha256(`${doubt_details.user_email} ${doubt_details.slot_id}`)
        if (!hashed_id) {
            res.status(403).json({
                message: 'Error generating doubt query'
            })
            return
        }
        const new_doubt = await prisma.doubts.create({
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
        })

        if (!new_doubt) {
            res.status(403).json({
                message: 'Error creating doubt query'
            })
            return
        }

        res.status(200).json({
            message: 'Successfully created doubt , please wait while the admin approves it',
            valid: true,
            doubtId: new_doubt.hashed_id,
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})

meetings_router.post('/createMeetingLink/:doubtId', async (req: any, res: express.Response) => {
    try {
        const doubtId = req.params.doubtId;
        if (!doubtId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        let obj: any;

        const result = await prisma.$transaction(async (tx): Promise<Boolean | any> => {
            const doubt_entry = await prisma.doubts.findFirst({
                where: {
                    hashed_id: doubtId
                }
            })
            if (!doubt_entry || doubt_entry.completed) {
                res.status(400).json({
                    message: 'Doubt entry does not exists'
                })
                return false
            }
            const meeting_deatils = await generateZoomMeeting(['kunalindia59@gmail.com', doubt_entry.user_email], 'kunalindia59@gmail.com', 'Kunal Singh', doubt_entry.date, 15, `${doubt_entry.doubt_type}-${doubt_entry.class}`,)
            if (!meeting_deatils || !meeting_deatils.id) {
                return false
            }

            const meeting = await tx.meeting.findFirst({
                where: {
                    doubt_id: doubt_entry.id
                }
            })
            if (meeting) {
                res.status(403).json({
                    message: 'Meeting for doubt already exists'
                })
                return false
            }

            const new_meeting = await prisma.meeting.create({
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
            })
            obj = new_meeting

            const updated = await prisma.doubts.update({
                where: {
                    id: Number(doubt_entry.id)
                },
                data: {
                    request_accepted: true
                }
            })
            if (!updated) {
                res.status(403).json({
                    message: 'Unable to permit doubt query'
                })
            }

            if (!new_meeting) {
                res.status(403).json({
                    message: 'Error generating meeting'
                })
                return false
            }

            return true
        })
        if (!result) {
            res.status(400).json({
                message: 'Error generating meeting link'
            })
        }
        res.status(200).json({
            message: 'Successfully created meeting',
            meeting: obj
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})

meetings_router.get('/meetingDetails/:doubtId', async (req: any, res: express.Response) => {
    try {
        const doubtId = req.params.doubtId
        if (!doubtId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const doubt = await prisma.doubts.findFirst({
            where: {
                id: Number(doubtId)
            }
        })
        if (!doubt) {
            res.status(404).json({
                message: 'Doubt not found'
            })
            return
        }
        const meeting = await prisma.meeting.findFirst({
            where: {
                doubt_id: doubt.id,
            }
        })
        if (!meeting) {
            res.status(404).json({
                message: 'No meetings found'
            })
            return
        }
        res.status(200).json({
            meeting: meeting
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})
meetings_router.get('/slots', async (req: express.Request, res: express.Response) => {
    try {
        const week = await prisma.week.findFirst({
            where: {
                completed: false
            }
        })
        if (!week) {
            res.status(400).json({
                message: 'No availabilty for current weak'
            })
            return
        }
        const slots = await prisma.slot.findMany({
            where: {
                week_id: week?.id,
                slot_booked: false,
            }
        })
        if (!slots || slots.length == 0) {

        }
    } catch (error) {

    }
})


export default meetings_router