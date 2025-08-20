"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_1 = __importDefault(require("./teacher"));
const students_1 = __importDefault(require("./students"));
const files_1 = __importDefault(require("./files"));
const router = express_1.default.Router();
router.use("/teacher", teacher_1.default);
router.use('/files', files_1.default);
router.use("/student", students_1.default);
exports.default = router;
