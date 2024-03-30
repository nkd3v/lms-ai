import jwt from 'jsonwebtoken';
import { Request } from "express";

export const jwtAuth = (req: Request) => {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        throw new Error("Authorization token is missing");
    }
    try {
        const decoded: any = jwt.verify(jwtToken, process.env.JWT_SECRET || '');
        req.user = decoded.user;
    } catch (err) {
        throw new Error("Invalid token");
    }
};