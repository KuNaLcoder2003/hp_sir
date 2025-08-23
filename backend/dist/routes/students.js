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
const multer_1 = __importDefault(require("multer"));
const prisma_1 = require("../../generated/prisma");
const generateToken_1 = require("../functions/generateToken");
const studentMiddleWare_1 = require("../middlewares/studentMiddleWare");
const bcrypt_1 = __importDefault(require("bcrypt"));
const salts = 10;
const prisma = new prisma_1.PrismaClient();
const memory = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: memory });
const student_router = express_1.default.Router();
student_router.get('/batches/subjects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batches = yield prisma.batch.findMany({});
        if (batches.length == 0) {
            res.status(404).json({
                message: 'No batches posted yet'
            });
            return;
        }
        const ids = batches.map(obj => {
            return obj.id;
        });
        const subjects = yield prisma.subjects.findMany({
            where: {
                batchId: {
                    in: ids
                }
            }
        });
        res.status(200).json({
            batches,
            subjects
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
student_router.get('/details', studentMiddleWare_1.studentMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        const student = yield prisma.student.findFirst({
            where: { email: email }
        });
        if (!student) {
            res.status(404).json({
                message: 'Student id not found'
            });
            return;
        }
        const batch = yield prisma.batch.findFirst({
            where: { id: student.batchId }
        });
        if (!batch) {
            res.status(402).json({
                message: 'You are currenty not enrolled in any batch'
            });
            return;
        }
        if (!(student === null || student === void 0 ? void 0 : student.permitted)) {
            res.status(401).json({
                permitted: false,
                message: 'You are not permitted by the admin yet , please contact the admin',
                batch_name: batch.batch_name
            });
            return;
        }
        const subjects = yield prisma.studentSubjects.findMany({
            where: { studentEmail: email, batchId: batch.id }
        });
        const subs = yield prisma.subjects.findMany({
            where: {
                id: {
                    in: subjects.map(obj => {
                        return obj.subjectId;
                    })
                }
            }
        });
        const ids = subjects.map(obj => {
            return obj.subjectId;
        });
        const content = yield prisma.content.findMany({
            where: {
                subjectId: {
                    in: ids
                }
            }
        });
        res.status(200).json({
            content,
            subs,
            student,
            batch
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
student_router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password, batch } = req.body;
        if (!first_name || !last_name || !email || !password || !batch) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const student = yield prisma.student.findFirst({
            where: { email: email }
        });
        if (student) {
            res.status(402).json({
                message: 'Student is already registerd , login to access your content'
            });
            return;
        }
        const entries = batch.subjects.map(obj => {
            return {
                batchId: batch.batchId,
                subjectId: obj.subjectId
            };
        });
        const hashedPasswod = bcrypt_1.default.hashSync(password, salts);
        if (!hashedPasswod) {
            res.status(402).json({
                message: 'Unable to create account'
            });
            return;
        }
        const new_student = yield prisma.student.create({
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
        });
        console.log(new_student);
        res.status(200).json({
            message: 'Successfully registered',
            student: new_student
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
student_router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body.cred;
    try {
        if (!email || !password) {
            res.status(402).json({
                message: 'Bad request'
            });
            return;
        }
        const student = yield prisma.student.findFirst({
            where: { email: email }
        });
        if (!student) {
            res.status(404).json({
                message: 'Student doest not exists'
            });
            return;
        }
        const matchedPasswod = bcrypt_1.default.compareSync(password, student.password);
        if (!matchedPasswod) {
            res.status(404).json({
                message: 'Invalid Password'
            });
            return;
        }
        const token = (0, generateToken_1.generateToken)(student.email, "student");
        if (!token) {
            res.status(402).json({
                message: 'Error signing in'
            });
        }
        res.status(200).json({
            token: token,
            role: "student",
            user: `${student.first_name} ${student.last_name}`,
            message: 'Signed in succesfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
student_router.get('/subjectDetails/:id', studentMiddleWare_1.studentMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        const student = yield prisma.student.findFirst({
            where: { email: email }
        });
        if (!(student === null || student === void 0 ? void 0 : student.permitted)) {
            res.status(401).json({
                permitted: false,
                message: 'You are not permitted by the admin yet , please contact the admin'
            });
            return;
        }
        const id = req.params.id;
        const subject = yield prisma.subjects.findFirst({
            where: { id: Number(id) }
        });
        if (!subject) {
            res.status(400).json({
                message: 'No such subject exists'
            });
            return;
        }
        const content = yield prisma.content.findMany({
            where: {
                subjectId: subject.id
            }
        });
        res.status(200).json({
            student_name: `${student === null || student === void 0 ? void 0 : student.first_name} ${student === null || student === void 0 ? void 0 : student.last_name}`,
            subject,
            content
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
exports.default = student_router;
