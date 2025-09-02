
import dotenv from "dotenv"
dotenv.config()
const zoomClientId = `${process.env.ZOOM_CLIENT_ID}`
const zoomAccountId = `${process.env.ZOOM_ACCOUNT_ID}`
const zoomClientSecret = `${process.env.ZOOM_CLIENT_SECRET}`

const base = require('base-64')

export const getAuthHeaders = () => {
    return {
        Authorization: `Basic ${base.encode(
            `${zoomClientId}:${zoomClientSecret}`
        )}`,
        "Content-Type": "application/json",
    };
};
export const generateZoomAccessToken = async () => {
    try {
        const response = await fetch(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
            {
                method: "POST",
                headers: getAuthHeaders(),
            }
        );
        const jsonResponse = await response.json();
        return jsonResponse?.access_token;
    } catch (error) {
        console.log("generateZoomAccessToken Error --> ", error);
        throw error;
    }
};
type invitee = string
interface zoomResponse {
    uuid: string,
    host_email: string,
    topic: string,
    duration: number,
    start_url: string,
    join_url: string,
    password: string,

}
export const generateZoomMeeting = async (invitees: invitee[], email: string, name: string, date: Date, duration: number, agenda: string) => {
    let res;
    try {
        const zoomAccessToken = await generateZoomAccessToken();

        const response = await fetch(
            `https://api.zoom.us/v2/users/me/meetings`,
            {
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
                                        return obj
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
            }
        );

        const jsonResponse = await response.json();


        console.log("generateZoomMeeting JsonResponse --> ", jsonResponse);
        res = jsonResponse
    } catch (error) {
        console.log("generateZoomMeeting Error --> ", error);
        throw error;
    }
    return res
};


