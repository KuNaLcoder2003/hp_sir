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
        const batch_details: NewBatch = req.body;
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
        })

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
export default batchRouter;