
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const uploadNotes = async (chapterId: string, formData: FormData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/notes/${chapterId}`, {
            method: 'POST',
            headers: {
                'Authorization': 'DYRTN_BY_HP_SIR_6/120_ABHAYASA',
            },
            body: formData
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

export default uploadNotes;