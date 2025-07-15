import express from "express"
import multer from "multer"
import { PrismaClient } from "../../generated/prisma"
const prisma = new PrismaClient()
const memory = multer.memoryStorage()
const upload = multer({ storage: memory })

const student_router = express.Router()

interface Subject {
    subjectId: number
}

interface BatchSubject {
    batchId: number,
    subjects: Subject[]
}

interface New_Registration {
    first_name: string,
    last_name: string,  
    email: string,
    password: string,
    batch: BatchSubject,
}

student_router.get('/batches/subjects', async (req: express.Request, res: express.Response) => {
    try {
        const batches = await prisma.batch.findMany({})
        if (batches.length == 0) {
            res.status(404).json({
                message: 'No batches posted yet'
            })
            return
        }
        const ids = batches.map(obj => {
            return obj.id
        })
        const subjects = await prisma.subjects.findMany({
            where : {
                batchId : {
                    in : ids
                }
            }
        })
        res.status(200).json({
            batches , 
            subjects
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
student_router.post('/register', async (req: express.Request, res: express.Response) => {
    try {
        const { first_name, last_name, email, password, batch } = req.body as New_Registration;

        if (!first_name || !last_name || !email || !password || !batch) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const student = await prisma.student.findFirst({
            where: { email: email }
        })
        if (student) {
            res.status(402).json({
                message: 'Student is already registerd , login to access your content'
            })
            return
        }
        const entries = batch.subjects.map(obj => {
            return {
                batchId: batch.batchId,
                subjectId: obj.subjectId
            }
        })
        const new_student = await prisma.student.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                avatar: "",
                batchId: batch.batchId,
                subjects: {
                    createMany: {
                        data: entries
                    }
                }
            }
        })
        console.log(new_student)
        res.status(200).json({
            message: 'Successfully registered',
            student: new_student
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
export default student_router