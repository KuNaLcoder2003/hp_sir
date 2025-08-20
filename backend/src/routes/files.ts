import express from "express"
import { PrismaClient } from "../../generated/prisma";
import { generateAiBasedTest } from "../functions/groq";
import { adminMiddleWare } from "../middlewares/adminMiddleware";
const prisma = new PrismaClient()
const files_router = express.Router()

files_router.post('/generate', async (req: any, res: express.Response) => {
    const { prompt } = req.body
    try {
        // if (!batch_id || !subject_id) {
        //     res.status(400).json({
        //         message: 'Bad Request'
        //     })
        //     return
        // }
        console.log('req reached')
        const prompt_response = await generateAiBasedTest(prompt)
        if (prompt_response.length == 0) {
            res.status(403).json({
                message: 'Error generating response'
            })
            return
        }
        console.log(prompt_response)
        res.status(200).json({
            response: `${prompt_response}`
        })


    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

export default files_router