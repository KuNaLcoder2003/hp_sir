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
const groq_1 = require("../functions/groq");
const prisma = new prisma_1.PrismaClient();
const files_router = express_1.default.Router();
files_router.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    try {
        // if (!batch_id || !subject_id) {
        //     res.status(400).json({
        //         message: 'Bad Request'
        //     })
        //     return
        // }
        console.log('req reached');
        const prompt_response = yield (0, groq_1.generateAiBasedTest)(prompt);
        if (prompt_response.length == 0) {
            res.status(403).json({
                message: 'Error generating response'
            });
            return;
        }
        console.log(prompt_response);
        res.status(200).json({
            response: `${prompt_response}`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
exports.default = files_router;
