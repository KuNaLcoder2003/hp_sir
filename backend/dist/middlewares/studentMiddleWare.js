"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentMiddleWare = studentMiddleWare;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function studentMiddleWare(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Invalid access'
            });
            return;
        }
        const token = authToken.split('Bearer ')[1];
        const verify = jsonwebtoken_1.default.verify(token, "ihqe802ue9");
        if (!verify) {
            res.status(401).json({
                message: 'Invalid'
            });
            return;
        }
        else {
            req.email = verify.email;
            next();
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
        return;
    }
}
