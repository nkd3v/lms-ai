"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuth = (req) => {
    const token = req.header('Authorization');
    if (!token) {
        throw new Error("Authorization token is missing");
    }
    if (token.startsWith("Bearer ") == false) {
        throw new Error("Authorization token should start with Bearer");
    }
    const jwtToken = token.substring(7, token.length);
    try {
        const decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET || '');
        req.user = decoded;
    }
    catch (err) {
        throw new Error("Invalid token");
    }
};
exports.jwtAuth = jwtAuth;
