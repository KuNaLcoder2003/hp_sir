
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
interface Response {
    data?: any,
    valid: boolean,
    message?: string
}
const getMaterial = async (chapterId: string): Promise<Response> => {
    try {
        const response = await fetch(`${BACKEND_URL}/chapter/chapterDetails/${chapterId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        if (!data.material) {
            return {
                valid: false,
                message: data.message
            }
        } else {
            return {
                data: data,
                valid: true
            }
        }
    } catch (error) {
        return {
            message: error,
            valid: false
        }
    }
}

export default getMaterial;