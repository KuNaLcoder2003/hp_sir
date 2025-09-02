"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.generateTokensForDoubt = generateTokensForDoubt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "ihqe802ue9";
function generateToken(email, role) {
    const token = jsonwebtoken_1.default.sign({ email: email, role: role }, secret);
    return token;
}
function generateTokensForDoubt() {
    return;
}
