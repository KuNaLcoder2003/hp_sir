import express from "express"
import batchRouter from "./batch.js";

const router = express.Router()

router.use('/batch', batchRouter)

export default router;