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
const prisma = new prisma_1.PrismaClient();
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("../functions/cloudinary");
const generateToken_1 = require("../functions/generateToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const teacher_router = express_1.default.Router();
const salts = 10;
teacher_router.get('/student/:batchid/:subjectId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const batchId = req.params.batchid;
    const subjectId = req.params.subjectId;
    try {
        const students = yield prisma.studentSubjects.findMany({
            where: {
                batchId: Number(batchId),
                subjectId: Number(subjectId)
            }
        });
        const ids = students.map((student) => {
            return student.studentEmail;
        });
        const students_array = yield prisma.student.findMany({
            where: {
                email: {
                    in: ids
                }
            }
        });
        res.status(200).json({
            students: students_array
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body.adminCred;
        if (!email || !password) {
            res.status(400).json({
                message: 'Bad requests'
            });
            return;
        }
        const teacher = yield prisma.teacher.findFirst({
            where: {
                email: email
            }
        });
        if (!teacher) {
            res.status(404).json({
                message: 'Account not found'
            });
            return;
        }
        const matched = bcrypt_1.default.compareSync(password, teacher.password);
        if (!matched) {
            res.status(401).json({
                message: 'Wrong password'
            });
        }
        const token = (0, generateToken_1.generateToken)(email, "admin");
        if (!token) {
            res.status(402).json({
                message: 'Error logging in'
            });
            return;
        }
        res.status(200).json({
            token: token,
            message: 'SignedIn',
            role: "admin",
            user: `${teacher.first_name} ${teacher.last_name}`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body.teacherCred;
        if (!first_name || !last_name || !email || !password) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const teacher = yield prisma.teacher.findFirst({
            where: {
                email: email
            }
        });
        if (teacher) {
            res.status(402).json({
                message: 'Account already exixts'
            });
            return;
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, salts);
        if (!hashedPassword) {
            res.status(403).json({
                message: 'Error creating account'
            });
            return;
        }
        const new_teacher = yield prisma.teacher.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword
            }
        });
        if (!new_teacher) {
            res.status(403).json({
                message: 'Error creating account'
            });
            return;
        }
        res.status(200).json({
            message: 'Successfully created',
            valid: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.post('/admit_students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        if (ids.length == 0) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const admittedStudents = yield prisma.student.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                permitted: true
            }
        });
        if (!admittedStudents || admittedStudents.count == 0) {
            res.status(402).json({
                message: 'Error permitting students'
            });
            return;
        }
        res.status(200).json({
            message: 'Students permitted',
            valid: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.delete('/student/:studentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.studentId;
        if (!id) {
            res.status(402).json({
                message: 'Bad Request'
            });
            return;
        }
        const student_deleted = yield prisma.student.delete({
            where: { id: Number(id) }
        });
        if (!student_deleted) {
            res.status(403).json({
                message: 'Error deleting studnet'
            });
        }
        res.status(200).json({
            valid: true,
            message: 'Student deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.get('/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma.batch.findMany();
        if (!courses) {
            res.status(404).json({
                message: 'No courses yet'
            });
            return;
        }
        const ids = courses.map(obj => {
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
            courses: courses,
            subjects: subjects
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.get('/course/:courseId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    try {
        const course = yield prisma.batch.findFirst({
            where: { id: Number(courseId) }
        });
        if (!course) {
            res.status(404).json({
                message: 'No course found'
            });
            return;
        }
        const subjects = yield prisma.subjects.findMany({
            where: { batchId: course.id }
        });
        const ids = subjects.map((obj) => {
            return obj.id;
        });
        const content = yield prisma.content.findMany({
            where: {
                subjectId: {
                    in: ids
                }
            }
        });
        res.status(200).json({
            batch_name: course.batch_name,
            content,
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
teacher_router.post('/batch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { batch_name, duration } = req.body.batch;
    try {
        const new_batch = yield prisma.batch.create({
            data: {
                batch_name: batch_name,
                duration: duration
            }
        });
        if (!new_batch) {
            res.status(400).json({
                message: 'Unable to create a new batch'
            });
        }
        res.status(200).json({
            message: 'New batch created',
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
teacher_router.post("/subject/:batchId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batchId = req.params.batchId;
        const subject_name = req.body.subject;
        if (!batchId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        const batch = yield prisma.batch.findFirst({
            where: { id: Number(batchId) }
        });
        if (!batch) {
            res.status(404).json({
                message: 'No batch exists',
            });
            return;
        }
        const new_subject = yield prisma.subjects.create({
            data: {
                subject_name: subject_name,
                batchId: Number(batchId)
            }
        });
        if (!new_subject) {
            res.status(400).json({
                message: 'Error creating a new subject'
            });
            return;
        }
        res.status(200).json({
            message: 'Subject created',
            valid: true,
            subject: new_subject
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.post('/content/:subjectId', upload.single('content'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectId = req.params.subjectId;
    const { content_name, type } = req.body;
    const file = req.file;
    try {
        if (!subjectId) {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }
        if (!content_name || !type || !file) {
            res.status(400).json({
                message: 'Missing feilds'
            });
            return;
        }
        const subject = yield prisma.subjects.findFirst({
            where: { id: Number(subjectId) }
        });
        if (!subject) {
            res.status(404).json({
                message: 'No subject found'
            });
            return;
        }
        const buffer = Buffer.from(file.buffer);
        const result = yield (0, cloudinary_1.uploadOnCloud)(buffer, "class_content", "auto");
        if (!result.valid) {
            res.status(400).json({
                message: 'Error uploading content'
            });
            return;
        }
        const new_content = yield prisma.content.create({
            data: {
                content_name: content_name,
                type: type,
                content_url: result.url,
                subjectId: Number(subjectId),
                uploaded_on: new Date()
            }
        });
        if (!new_content) {
            res.status(400).json({
                message: 'Error creating a new content'
            });
            return;
        }
        res.status(200).json({
            message: 'Succesfully uploaded!',
            new_content,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
exports.default = teacher_router;
