import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import prisma from "../prisma.js";

const batchRouter = express.Router()

interface NewBatch {
    batch_name: string
    batch_description: string
}
batchRouter.post('/', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const batch_details: NewBatch = req.body; ``
        console.log('Reached here ')
        if (!batch_details || !batch_details.batch_description || !batch_details.batch_name) {
            res.status(400).json({
                message: "Either Batch name or description or both missing",
                valid: false
            })
            return;
        }

        const response = await prisma.$transaction(async (tx) => {
            const new_batch = await tx.batch.create({
                data: {
                    batch_name: batch_details.batch_name,
                    batch_description: batch_details.batch_description,
                    start_date: new Date(),
                }
            })
            return { new_batch }
        }, { timeout: 20000, maxWait: 10000 })

        if (!response.new_batch) {
            res.status(403).json({
                message: 'Unable to create a new batch',
                valid: false
            })
        }
        res.status(200).json({
            message: 'Batch created',
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            valid: false,
            error: error
        })
    }
})

batchRouter.get('/batchDetails/:batchId', async (req: express.Request, res: express.Response) => {
    try {
        const batchId = req.params.batchId;
        if (!batchId) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const batch = await tx.batch.findUnique({
                where: {
                    id: batchId
                },
                select: {
                    batch_name: true,
                    batch_description: true
                }
            })
            const chapters = await tx.chapter.findMany({
                where: {
                    batch_id: batchId
                }
            })
            return { batch, chapters }
        }, { timeout: 20000, maxWait: 10000 })

        if (!response || !response.batch) {
            res.status(404).json({
                message: "Batch not found",
                valid: false
            })
            return
        }
        console.log(response.batch)
        res.status(200).json({
            batch_details: response.batch,
            batch_chapters: response.chapters
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            valid: false,
            error: error
        })
    }
})
export default batchRouter;