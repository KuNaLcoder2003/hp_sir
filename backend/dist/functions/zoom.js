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
exports.generateZoomMeeting = exports.generateZoomAccessToken = exports.getAuthHeaders = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const zoomClientId = `${process.env.ZOOM_CLIENT_ID}`;
const zoomAccountId = `${process.env.ZOOM_ACCOUNT_ID}`;
const zoomClientSecret = `${process.env.ZOOM_CLIENT_SECRET}`;
const base = require('base-64');
const getAuthHeaders = () => {
    return {
        Authorization: `Basic ${base.encode(`${zoomClientId}:${zoomClientSecret}`)}`,
        "Content-Type": "application/json",
    };
};
exports.getAuthHeaders = getAuthHeaders;
const generateZoomAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`, {
            method: "POST",
            headers: (0, exports.getAuthHeaders)(),
        });
        const jsonResponse = yield response.json();
        return jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.access_token;
    }
    catch (error) {
        console.log("generateZoomAccessToken Error --> ", error);
        throw error;
    }
});
exports.generateZoomAccessToken = generateZoomAccessToken;
const generateZoomMeeting = (invitees, email, name, date, duration, agenda) => __awaiter(void 0, void 0, void 0, function* () {
    let res;
    try {
        const zoomAccessToken = yield (0, exports.generateZoomAccessToken)();
        const response = yield fetch(`https://api.zoom.us/v2/users/me/meetings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${zoomAccessToken}`,
            },
            body: JSON.stringify({
                agenda: agenda,
                default_password: false,
                duration: duration,
                password: "12345",
                settings: {
                    allow_multiple_devices: true,
                    alternative_hosts_email_notification: true,
                    breakout_room: {
                        enable: true,
                        rooms: [
                            {
                                name: "room1",
                                participants: invitees.map(obj => {
                                    return obj;
                                })
                            },
                        ],
                    },
                    calendar_type: 1,
                    contact_email: email,
                    contact_name: name,
                    email_notification: true,
                    encryption_type: "enhanced_encryption",
                    focus_mode: true,
                    // global_dial_in_countries: ["US"],
                    host_video: true,
                    join_before_host: true,
                    meeting_authentication: true,
                    meeting_invitees: [
                        {
                            email: "garvitpriyansh@gmail.com",
                        },
                    ],
                    mute_upon_entry: true,
                    participant_video: true,
                    private_meeting: true,
                    waiting_room: false,
                    watermark: false,
                    continuous_meeting_chat: {
                        enable: true,
                    },
                },
                start_time: date.toISOString(),
                timezone: "Asia/Kolkata",
                topic: "Zoom Meeting for YT Demo",
                type: 2, // 1 -> Instant Meeting, 2 -> Scheduled Meeting
            }),
        });
        const jsonResponse = yield response.json();
        console.log("generateZoomMeeting JsonResponse --> ", jsonResponse);
        res = jsonResponse;
    }
    catch (error) {
        console.log("generateZoomMeeting Error --> ", error);
        throw error;
    }
    return res;
});
exports.generateZoomMeeting = generateZoomMeeting;
