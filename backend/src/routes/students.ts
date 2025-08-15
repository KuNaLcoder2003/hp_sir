import express from "express"
import multer from "multer"
import { PrismaClient } from "../../generated/prisma"
import { generateToken } from "../functions/generateToken"
import { studentMiddleWare } from "../middlewares/studentMiddleWare"
import bcrypt from "bcrypt"
const salts = 10;
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

student_router.get('/batches/subjects', async (req: any, res: express.Response) => {
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
            where: {
                batchId: {
                    in: ids
                }
            }
        })
        res.status(200).json({
            batches,
            subjects
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
student_router.get('/details', studentMiddleWare, async (req: any, res: express.Response) => {
    try {
        const email = req.email
        const student = await prisma.student.findFirst({
            where: { email: email }
        })
        if (!student) {
            res.status(404).json({
                message: 'Student id not found'
            })
            return
        }
        const batch = await prisma.batch.findFirst({
            where: { id: student.batchId }
        })
        if (!batch) {
            res.status(402).json({
                message: 'You are currenty not enrolled in any batch'
            })
            return
        }
        const subjects = await prisma.studentSubjects.findMany({
            where: { studentEmail: email, batchId: batch.id }
        })

        const subs = await prisma.subjects.findMany({
            where: {
                id: {
                    in: subjects.map(obj => {
                        return obj.subjectId
                    })
                }
            }
        })

        const ids = subjects.map(obj => {
            return obj.subjectId
        })
        const content = await prisma.content.findMany({
            where: {
                subjectId: {
                    in: ids
                }
            }
        })
        res.status(200).json({
            content,
            subs,
            student,
            batch
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
        const hashedPasswod = bcrypt.hashSync(password, salts);
        if (!hashedPasswod) {
            res.status(402).json({
                message: 'Unable to create account'
            })
            return
        }
        const new_student = await prisma.student.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPasswod,
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

student_router.post('/signin', async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body.cred
    try {
        if (!email || !password) {
            res.status(402).json({
                message: 'Bad request'
            })
            return
        }
        const student = await prisma.student.findFirst({
            where: { email: email }
        })
        if (!student) {
            res.status(404).json({
                message: 'Student doest not exists'
            })
            return
        }
        const matchedPasswod = bcrypt.compareSync(password, student.password)
        if (!matchedPasswod) {
            res.status(404).json({
                message: 'Invalid Password'
            })
            return
        }
        const token = generateToken(student.email, "student")
        if (!token) {
            res.status(402).json({
                message: 'Error signing in'
            })
        }
        res.status(200).json({
            token: token,
            message: 'Signed in succesfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
student_router.get('/subjectDetails/:id', studentMiddleWare, async (req: any, res: express.Response) => {
    try {
        const email = req.email
        const student = await prisma.student.findFirst({
            where: { email: email }
        })
        const id = req.params.id
        const subject = await prisma.subjects.findFirst({
            where: { id: Number(id) }
        })
        if (!subject) {
            res.status(400).json({
                message: 'No such subject exists'
            })
            return
        }
        const content = await prisma.content.findMany({
            where: {
                subjectId: subject.id
            }
        })
        res.status(200).json({
            student_name: `${student?.first_name} ${student?.last_name}`,
            subject,
            content
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
export default student_router