"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authRouter = express_1.default.Router();
exports.authRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
exports.authRouter.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    const token = jsonwebtoken_1.default.sign({ user: req.user }, process.env.JWT_SECRET || '', { expiresIn: "1h" });
    res.cookie('jwtToken', token);
    res.redirect("http://localhost:5173");
});
exports.authRouter.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err)
            return next(err);
        res.clearCookie("jwtToken");
        res.redirect('http://localhost:5173');
    });
});
