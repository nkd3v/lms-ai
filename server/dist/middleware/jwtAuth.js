"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuth = (req, res, next) => {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        throw new Error("Authorization token is missing");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        throw new Error("Invalid token");
    }
};
exports.jwtAuth = jwtAuth;
