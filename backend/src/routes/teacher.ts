import express from "express"
import { PrismaClient } from "../../generated/prisma";
import { json } from "stream/consumers";
const prisma = new PrismaClient()
import multer from "multer"
import { uploadOnCloud } from "../functions/cloudinary";
import { generateToken } from "../functions/generateToken";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const teacher_router = express.Router();

interface NewBatch {
    batch_name: string,
    duration: number
}

teacher_router.post('/signin' , async(req : express.Request , res : express.Response)=> {
    try {
        const {email , password} = req.body.adminCred;
        if(!email || !password) {
            res.status(400).json({
                message : 'Bad requests'
            })
            return
        }

        const token  = generateToken(email , "admin")
        if(!token) {
            res.status(402).json({
                message : 'Error logging in'
            })
            return
        }
        res.status(200).json({
            token : token
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
})

teacher_router.get('/courses', async (req: express.Request, res: express.Response) => {
    try {
        const courses = await prisma.batch.findMany()
        if (!courses) {
            res.status(404).json({
                message: 'No courses yet'
            })
            return
        }
        const ids = courses.map(obj => {
            return obj.id
        })
        const subjects = await prisma.subjects.findMany({
            where : {batchId : {
                in : ids
            }}
        })
        res.status(200).json({
            courses : courses,
            subjects : subjects
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
teacher_router.get('/course/:courseId', async (req: express.Request, res: express.Response) => {
    const courseId = req.params.courseId
    try {
        const course = await prisma.batch.findFirst({
            where: { id: Number(courseId) }
        })
        if (!course) {
            res.status(404).json({
                message: 'No course found'
            })
            return
        }
        const subjects = await prisma.subjects.findMany({
            where: { batchId: course.id }
        })
        const ids = subjects.map((obj) => {
            return obj.id
        })
        const content = await prisma.content.findMany({
            where: {
                subjectId: {
                    in: ids
                }
            }
        })
        res.status(200).json({
            batch_name: course.batch_name,
            content,
            subjects
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/batch', async (req: express.Request, res: express.Response) => {
    const { batch_name, duration } = req.body.batch as NewBatch
    try {
        const new_batch = await prisma.batch.create({
            data: {
                batch_name: batch_name,
                duration: duration
            }
        })
        if (!new_batch) {
            res.status(400).json({
                message: 'Unable to create a new batch'
            })
        }
        res.status(200).json({
            message: 'New batch created',
            valid: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post("/subject/:batchId", async (req: express.Request, res: express.Response) => {
    try {
        const batchId = req.params.batchId
        const subject_name = req.body.subject
        if (!batchId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const batch = await prisma.batch.findFirst({
            where: { id: Number(batchId) }
        })
        if (!batch) {
            res.status(404).json({
                message: 'No batch exists',
            })
            return
        }
        const new_subject = await prisma.subjects.create({
            data: {
                subject_name: subject_name,
                batchId: Number(batchId)
            }
        })
        if (!new_subject) {
            res.status(400).json({
                message: 'Error creating a new subject'
            })
            return
        }
        res.status(200).json({
            message: 'Subject created',
            valid: true,
            subject: new_subject
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/content/:subjectId', upload.single('content'), async (req: express.Request, res: express.Response) => {
    const subjectId = req.params.subjectId
    const { content_name, type } = req.body
    const file = req.file as Express.Multer.File
    try {
        if (!subjectId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        if (!content_name || !type || !file) {
            res.status(400).json({
                message: 'Missing feilds'
            })
            return
        }
        const subject = await prisma.subjects.findFirst({
            where: { id: Number(subjectId) }
        })
        if (!subject) {
            res.status(404).json({
                message: 'No subject found'
            })
            return
        }
        const buffer = Buffer.from(file.buffer)
        const result = await uploadOnCloud(buffer, "class_content", "auto")
        if (!result.valid) {
            res.status(400).json({
                message: 'Error uploading content'
            })
            return
        }
        const new_content = await prisma.content.create({
            data: {
                content_name: content_name,
                type: type,
                content_url: result.url,
                subjectId: Number(subjectId),
                uploaded_on: new Date()
            }
        })
        if (!new_content) {
            res.status(400).json({
                message: 'Error creating a new content'
            })
            return
        }
        res.status(200).json({
            message: 'Succesfully uploaded!',
            new_content,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
export default teacher_router