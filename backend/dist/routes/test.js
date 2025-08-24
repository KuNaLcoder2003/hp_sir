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
const prisma = new prisma_1.PrismaClient();
const test_router = express_1.default.Router();
test_router.get('/details/:batchId/:subjectId', studentMiddleWare_1.studentMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const batch_id = req.params.batchId;
    const subject_id = req.params.subjectId;
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
        const subject = yield prisma.subjects.findFirst({
            where: {
                id: Number(subject_id)
            }
        });
        if (!subject) {
            res.status(402).json({
                message: 'Subject does not exists',
                valid: false
            });
            return;
        }
        const test = yield prisma.test.findMany({
            where: { batch_id: batch.id, subject_id: subject.id }
        });
        const tests = test.map((test) => {
            return {
                name: test.test_name,
                id: test.id,
                date: test.date
            };
        });
        res.status(200).json({
            tests: tests
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
test_router.post('/newTest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { test_name, batch_id, subject_id } = req.body;
        if (!batch_id || !subject_id || test_name) {
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
                date: new Date()
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
