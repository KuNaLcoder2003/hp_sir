import express from "express"
import { PrismaClient } from "../../generated/prisma";
import { studentMiddleWare } from "../middlewares/studentMiddleWare";
import { get_result_data } from "../functions/results";
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
    date: Date,
    attempted?: boolean
}

async function update_user_marks(results: Result[]): Promise<boolean> {
    try {
        await Promise.all(results.map(async (result) => {
            return prisma.results.update({
                where: {
                    student_id_test_id: {
                        test_id: result.test_id,
                        student_id: result.student_id
                    }
                },
                data: result
            })
        }))
        return true
    } catch (error) {
        console.error("Error updating results:", error)
        return false
    }
}

test_router.get('/details/:batchId', studentMiddleWare, async (req: any, res: express.Response) => {
    const batch_id = req.params.batchId
    const student_email = req.email
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

        //find the subjects the student is registered in 
        const filtered_tests = await prisma.test.findMany({
            where: {
                batch_id: batch.id,
                subject_id: {
                    in: (
                        await prisma.studentSubjects.findMany({
                            where: { studentEmail: student_email },
                            select: { subjectId: true }
                        })
                    ).map(s => s.subjectId)
                }
            }
        })


        const tests = filtered_tests.map((test) => {
            return {
                name: test.test_name,
                id: test.id,
                date: test.date.toISOString().split("T")[0]
            }
        })
        res.status(200).json({
            batch_name: batch.batch_name,
            tests: tests
        })
    } catch (error) {
        console.log('route error : ', error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

test_router.get('/getTestResult/:testId', studentMiddleWare, async (req: any, res: express.Response) => {
    const studentEmail = req.email
    try {
        console.log("req reached")
        const testId = req.params.testId
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const test = await prisma.test.findFirst({
            where: {
                id: Number(testId)
            }
        })
        if (!test) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const results = await prisma.results.findMany({
            where: {
                test_id: Number(testId),
                attempted: true
            }
        })

        const student = await prisma.student.findFirst({
            where: {
                email: studentEmail
            }
        })
        if (!student) {
            res.status(403).json({
                message: 'Unauthorized'
            })
            return
        }

        const { highestMarks, no_of_students_attempted, rank, average, student_marks, attempted } = get_result_data(results, student.id)

        console.log(results)

        res.status(200).json({
            test_name: test.test_name,
            highestMarks,
            no_of_students_attempted,
            rank,
            average,
            student_marks,
            attempted
        })
    } catch (error) {
        console.log('route error : ', error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

test_router.put('/updateResult/:testId', async (req: any, res: express.Response) => {
    try {
        const testId = req.params.testId;
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }

        const results_arr = req.body.results as any[]
        if (!results_arr) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const filtered_tests: Result[] = results_arr.map(result => {
            return {
                student_id: result.student_id,
                marks: result.marks,
                date: new Date(),
                test_id: result.test_id,
                attempted: result.attempted,
            }
        })

        const updated = update_user_marks(filtered_tests)

        if (!updated) {
            res.status(403).json({
                message: 'Error updating results'
            })
            return
        }
        res.status(200).json({
            message: 'Successfully updated results',
            valid: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

test_router.get('/getResults/:testId', async (req: any, res: express.Response) => {
    try {
        console.log("req reached")
        const testId = req.params.testId
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const results = await prisma.results.findMany({
            where: {
                test_id: Number(testId)
            }
        })

        console.log(results)

        res.status(200).json({
            results: results
        })
    } catch (error) {
        console.log('route error : ', error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})


test_router.get('/details/:batchId/:subjectId', async (req: any, res: express.Response) => {
    const batch_id = req.params.batchId

    const subject_id = req.params.subjectId
    try {
        const studnet = await prisma.studentSubjects.findMany({
            where: {
                batchId: Number(batch_id),
                subjectId: Number(subject_id)
            }
        })
        const ids = studnet.map(studnet => {
            return studnet.studentEmail
        })

        const students = await prisma.student.findMany({
            where: {
                email: {
                    in: ids
                }
            }
        })
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

        const test = await prisma.test.findMany({
            where: {
                batch_id: Number(batch_id),
                subject_id: Number(subject_id)
            }
        })

        const tests = test.map((test) => {
            return {
                name: test.test_name,
                id: test.id,
                date: test.date.toISOString().split("T")[0]
            }
        })
        res.status(200).json({
            batch_name: batch.batch_name,
            tests: tests,
            students: students
        })
    } catch (error) {
        console.log('route error : ', error)
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
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

test_router.post('/marks/:testId', async (req: any, res: express.Response) => {
    try {
        const testId = req.params.testId;
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }

        const results_arr = req.body.results as any[]
        if (!results_arr) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const filtered_tests: Result[] = results_arr.map(result => {
            return {
                student_id: result.student_id,
                marks: result.marks,
                date: new Date(),
                test_id: result.test_id,
                attempted: result.attempted,
            }
        })

        const new_results = await prisma.results.createMany({
            data: filtered_tests
        })

        if (new_results.count == 0) {
            res.status(402).json({
                message: 'Unable to update results'
            })
            return
        }
        res.status(200).json({
            message: 'Successfully updated results',
            valid: true
        })
    } catch (error) {
        console.log(error)
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