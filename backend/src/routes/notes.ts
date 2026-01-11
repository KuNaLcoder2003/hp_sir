import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import prisma from '../prisma.js';
import uploadOnCloudinary from '../functions/cloudinary.js';
import multer from "multer"
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const notesRouter = express.Router()

notesRouter.post('/:chapterId', authMiddleware, upload.single('material'), async (req: express.Request, res: express.Response) => {
    try {
        const chapterId = req.params.chapterId;
        if (!chapterId) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }

        const { material_name, material_type } = req.body;
        const material_file = req.file as Express.Multer.File
        if (!material_name || !material_type) {
            res.status(400).json({
                message: "Either material name or type or both are missing",
                valid: false
            })
            return
        }
        if (!material_file) {
            res.status(400).json({
                message: "Material file is missing",
                valid: false
            })
        }
        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            }
        })

        const file_buffer = Buffer.from(material_file.buffer)
        if (!chapter) {
            res.status(404).json({
                message: "Chapter does not exists",
                valid: false
            })
            return
        }

        const response = await prisma.$transaction(async (tx) => {
            const result = await uploadOnCloudinary(file_buffer, "hp_sir_notes", "auto");
            if (result.error) {
                throw new Error('Unable to upload to cloud : ')
            }

            const new_material = await tx.material.create({
                data: {
                    chapter_id: chapter.id,
                    notes_link: result.url,
                    notes_title: material_name,
                    type: material_type
                }
            })
            return { new_material }
        }, { timeout: 20000, maxWait: 10000 })
        if (!response || !response.new_material) {
            res.status(403).json({
                message: 'Unable to upload material',
                valid: false
            })
            return
        }
        res.status(200).json({
            message: "Material uploaded",
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


export default notesRouter;