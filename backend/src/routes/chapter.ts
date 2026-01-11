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
        }, { timeout: 20000, maxWait: 10000 })

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

chapterRouter.get('/chapterDetails/:chapterId', async (req: express.Request, res: express.Response) => {
    try {
        const chapterId = req.params.chapterId;
        if (!chapterId) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }
        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            }
        })
        if (!chapter) {
            res.status(404).json({
                message: 'Chpater does not exists'
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const notes = await tx.material.findMany({
                where: {
                    chapter_id: chapterId
                },
                select: {
                    notes_link: true,
                    notes_title: true,
                    id: true,
                    type: true
                }
            })

            const videos = await tx.video.findMany({
                where: {
                    chapter_id: chapter.id
                },
                select: {
                    id: true,
                    video_link: true,
                    video_title: true
                }
            })
            return { notes, videos }
        })

        if (!response) {
            res.status(403).json({
                message: "Unable to get Chapter details"
            })
            return
        }
        res.status(200).json({
            material: response.notes,
            videos: response.videos,
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            valid: false
        })
    }
})
export default chapterRouter;