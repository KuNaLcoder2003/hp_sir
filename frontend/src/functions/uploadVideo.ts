
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const uploadVideo = async (chapterId: string, video_link: string, video_title: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/video/${chapterId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'DYRTN_BY_HP_SIR_6/120_ABHAYASA',
            },
            body: JSON.stringify({
                video_link: video_link,
                video_title: video_title
            })
        })
        const data = await response.json();
        if (data.valid) {
            return {
                message: data.message,
                err: false
            }
        } else {
            return {
                message: data.message,
                err: true
            }
        }
    } catch (error) {
        return {
            message: error,
            err: true
        }
    }
}

export default uploadVideo;