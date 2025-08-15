"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleWare = adminMiddleWare;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function adminMiddleWare(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Invalid access'
            });
            return;
        }
        const token = authToken.split('Bearer ')[1];
        const verify = jsonwebtoken_1.default.verify(token, "");
        if (!verify || !(verify.role == 'admin')) {
            res.status(401).json({
                message: 'Invalid'
            });
            return;
        }
        else {
            req.email = verify.email;
            req.role = verify.role;
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
