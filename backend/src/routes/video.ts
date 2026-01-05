import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import prisma from '../prisma.js';

const videoRouter = express.Router();

videoRouter.post('/:chapterId', authMiddleware, async (req: express.Request, res: express.Response) => {
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
                message: "Chapter does not exists",
                valid: false
            })
            return
        }
        const { video_title, video_link } = req.body
        if (!video_link || !video_title) {
            res.status(400).json({
                message: "Either video title or link or both misssing",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const new_video = await tx.video.create({
                data: {
                    video_link: video_link,
                    video_title: video_title,
                    chapter_id: chapterId
                }
            })
            return { new_video }
        })
        if (!response || !response.new_video) {
            res.status(403).json({
                message: 'Unale to upload video',
                valid: false,
            })
            return
        }
        res.status(200).json({
            message: 'Video uploaded',
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            messgae: "Somethig went wrong",
            valid: false,
            error: error
        })
    }
})
export default videoRouter;