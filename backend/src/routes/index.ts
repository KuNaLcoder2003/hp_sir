import express from "express"
import batchRouter from "./batch.js";
import chapterRouter from "./chapter.js";

const router = express.Router()

router.use('/batch', batchRouter)
router.use('/chapter', chapterRouter)

export default router;