"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../generated/prisma");
const studentMiddleWare_1 = require("../middlewares/studentMiddleWare");
const results_1 = require("../functions/results");
const prisma = new prisma_1.PrismaClient();
const test_router = express_1.default.Router();
function update_user_marks(results) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all(results.map((result) => __awaiter(this, void 0, void 0, function* () {
                return prisma.results.update({
                    where: {
                        student_id_test_id: {
                            test_id: result.test_id,
                            student_id: result.student_id
                        }
                    },
                    data: result
                });
            })));
            return true;
        }
        catch (error) {
            console.error("Error updating results:", error);
            return false;
        }
    });
}
test_router.get('/details/:batchId', studentMiddleWare_1.studentMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const batch_id = req.params.batchId;
    const student_email = req.email;
    try {
        const batch = yield prisma.batch.findFirst({
            where: { id: Number(batch_id) }
        });
        if (!batch) {
            res.status(402).json({
                message: 'Batch does not exists',
                valid: false
            });
            return;
        }
        //find the subjects the student is registered in 
        const filtered_tests = yield prisma.test.findMany({
            where: {
                batch_id: batch.id,
                subject_id: {
                    in: (yield prisma.studentSubjects.findMany({
                        where: { studentEmail: student_email },
                        select: { subjectId: true }
                    })).map(s => s.subjectId)
                }
            }
        });
        const tests = filtered_tests.map((test) => {
            return {
                name: test.test_name,
                id: test.id,
                date: test.date.toISOString().split("T")[0]
            };
        });
        res.status(200).json({
            batch_name: batch.batch_name,
            tests: tests
        });
    }
    catch (error) {
        console.log('route error : ', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.get('/getTestResult/:testId', studentMiddleWare_1.studentMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentEmail = req.email;
    try {
        console.log("req reached");
        const testId = req.params.testId;
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const test = yield prisma.test.findFirst({
            where: {
                id: Number(testId)
            }
        });
        if (!test) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const results = yield prisma.results.findMany({
            where: {
                test_id: Number(testId),
                attempted: true
            }
        });
        const student = yield prisma.student.findFirst({
            where: {
                email: studentEmail
            }
        });
        if (!student) {
            res.status(403).json({
                message: 'Unauthorized'
            });
            return;
        }
        const { highestMarks, no_of_students_attempted, rank, average, student_marks, attempted } = (0, results_1.get_result_data)(results, student.id);
        console.log(results);
        res.status(200).json({
            test_name: test.test_name,
            highestMarks,
            no_of_students_attempted,
            rank,
            average,
            student_marks,
            attempted
        });
    }
    catch (error) {
        console.log('route error : ', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.put('/updateResult/:testId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testId = req.params.testId;
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const results_arr = req.body.results;
        if (!results_arr) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const filtered_tests = results_arr.map(result => {
            return {
                student_id: result.student_id,
                marks: result.marks,
                date: new Date(),
                test_id: result.test_id,
                attempted: result.attempted,
            };
        });
        const updated = update_user_marks(filtered_tests);
        if (!updated) {
            res.status(403).json({
                message: 'Error updating results'
            });
            return;
        }
        res.status(200).json({
            message: 'Successfully updated results',
            valid: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.get('/getResults/:testId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("req reached");
        const testId = req.params.testId;
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const results = yield prisma.results.findMany({
            where: {
                test_id: Number(testId)
            }
        });
        console.log(results);
        res.status(200).json({
            results: results
        });
    }
    catch (error) {
        console.log('route error : ', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.get('/details/:batchId/:subjectId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const batch_id = req.params.batchId;
    const subject_id = req.params.subjectId;
    try {
        const studnet = yield prisma.studentSubjects.findMany({
            where: {
                batchId: Number(batch_id),
                subjectId: Number(subject_id)
            }
        });
        const ids = studnet.map(studnet => {
            return studnet.studentEmail;
        });
        const students = yield prisma.student.findMany({
            where: {
                email: {
                    in: ids
                }
            }
        });
        const batch = yield prisma.batch.findFirst({
            where: { id: Number(batch_id) }
        });
        if (!batch) {
            res.status(402).json({
                message: 'Batch does not exists',
                valid: false
            });
            return;
        }
        const test = yield prisma.test.findMany({
            where: {
                batch_id: Number(batch_id),
                subject_id: Number(subject_id)
            }
        });
        const tests = test.map((test) => {
            return {
                name: test.test_name,
                id: test.id,
                date: test.date.toISOString().split("T")[0]
            };
        });
        res.status(200).json({
            batch_name: batch.batch_name,
            tests: tests,
            students: students
        });
    }
    catch (error) {
        console.log('route error : ', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.post('/newTest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { test_name, batch_id, subject_id, date } = req.body;
        if (!batch_id || !subject_id || !test_name) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const new_test = yield prisma.test.create({
            data: {
                test_name: test_name,
                batch_id: batch_id,
                subject_id: subject_id,
                date: date
            }
        });
        if (!new_test) {
            res.status(402).json({
                message: 'Unable to create a test'
            });
            return;
        }
        res.status(200).json({
            message: 'Successfully created test',
            valid: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.post('/marks/:testId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testId = req.params.testId;
        if (!testId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const results_arr = req.body.results;
        if (!results_arr) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const filtered_tests = results_arr.map(result => {
            return {
                student_id: result.student_id,
                marks: result.marks,
                date: new Date(),
                test_id: result.test_id,
                attempted: result.attempted,
            };
        });
        const new_results = yield prisma.results.createMany({
            data: filtered_tests
        });
        if (new_results.count == 0) {
            res.status(402).json({
                message: 'Unable to update results'
            });
            return;
        }
        res.status(200).json({
            message: 'Successfully updated results',
            valid: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.post('/marks/:stuentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        const deatils = req.body;
        if (!studentId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        if (deatils.length == 0) {
            res.status(400).json({
                message: 'Select students to updates'
            });
            return;
        }
        const student = yield prisma.student.findFirst({
            where: {
                id: Number(studentId)
            }
        });
        if (!student) {
            res.status(404).json({
                message: 'Student does not exixts'
            });
            return;
        }
        const result = yield prisma.results.createMany({
            data: deatils
        });
        if (!result || !(result.count > 0)) {
            res.status(402).json({
                message: 'Failed to create result'
            });
            return;
        }
        res.status(200).json({
            message: 'Result created',
            valid: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
exports.default = test_router;
