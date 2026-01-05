import express from "express"
import batchRouter from "./batch.js";
import chapterRouter from "./chapter.js";
import notesRouter from "./notes.js";
import videoRouter from "./video.js";

const router = express.Router()

router.use('/batch', batchRouter)
router.use('/chapter', chapterRouter)
router.use('/notes', notesRouter)
router.use('/video', videoRouter)

export default router;