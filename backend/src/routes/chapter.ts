import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import prisma from "../prisma.js";

const chapterRouter = express.Router()

chapterRouter.post('/:batchId', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const batchId = req.params.batchId;
        if (!batchId) {
            res.status(400).json({
                message: 'Bad request',
                valid: false
            })
            return
        }
        const chapter_name = req.body.chapter_name as string
        const response = await prisma.$transaction(async (tx) => {
            const batch = await tx.batch.findUnique({
                where: {
                    id: batchId
                }
            })
            if (!batch) {
                throw new Error("Batch with id " + batchId + " does not exists")
            }
            const chapter = await tx.chapter.create({
                data: {
                    batch_id: batch.id,
                    chapter_name: chapter_name
                }
            })
            return { chapter }
        })

        if (!response || !response.chapter) {
            res.status(403).json({
                message: "Unable to add chapter",
                valid: false
            })
            return
        }
        res.status(200).json({
            message: "Chapter added",
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Something went wrong',
            valid: false
        })
    }
})
export default chapterRouter;