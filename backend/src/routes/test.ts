import express from "express"
import { PrismaClient } from "../../generated/prisma";
import { studentMiddleWare } from "../middlewares/studentMiddleWare";
const prisma = new PrismaClient()
const test_router = express.Router()

interface Test {
    test_name: string,
    batch_id: number,
    subject_id: number,
    date: Date
}

interface Result {
    student_id: number,
    test_id: number,
    marks: number,
    date: Date
}


test_router.get('/details/:batchId', studentMiddleWare, async (req: any, res: express.Response) => {
    const batch_id = req.params.batchId
    const subject_id = req.params.subjectId
    try {
        const batch = await prisma.batch.findFirst({
            where: { id: Number(batch_id) }
        })
        if (!batch) {
            res.status(402).json({
                message: 'Batch does not exists',
                valid: false
            })
            return
        }
        const subject = await prisma.subjects.findFirst({
            where: {
                id: Number(subject_id)
            }
        })
        if (!subject) {
            res.status(402).json({
                message: 'Subject does not exists',
                valid: false
            })
            return
        }
        const test = await prisma.test.findMany({
            where: { batch_id: batch.id }
        })
        const tests = test.map((test) => {
            return {
                name: test.test_name,
                id: test.id,
                date: test.date
            }
        })
        res.status(200).json({
            tests: tests
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

test_router.post('/newTest', async (req: any, res: express.Response) => {
    try {
        const { test_name, batch_id, subject_id, date } = req.body as Test

        if (!batch_id || !subject_id || !test_name) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const new_test = await prisma.test.create({
            data: {
                test_name: test_name,
                batch_id: batch_id,
                subject_id: subject_id,
                date: date
            }
        })
        if (!new_test) {
            res.status(402).json({
                message: 'Unable to create a test'
            })
            return
        }
        res.status(200).json({
            message: 'Successfully created test',
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})



test_router.post('/marks/:stuentId', async (req: any, res: express.Response) => {
    try {
        const studentId = req.params.studentId
        const deatils = req.body as Result[]
        if (!studentId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        if (deatils.length == 0) {
            res.status(400).json({
                message: 'Select students to updates'
            })
            return
        }
        const student = await prisma.student.findFirst({
            where: {
                id: Number(studentId)
            }
        })

        if (!student) {
            res.status(404).json({
                message: 'Student does not exixts'
            })
            return
        }

        const result = await prisma.results.createMany({
            data: deatils
        })

        if (!result || !(result.count > 0)) {
            res.status(402).json({
                message: 'Failed to create result'
            })
            return
        }
        res.status(200).json({
            message: 'Result created',
            valid: true
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

export default test_router