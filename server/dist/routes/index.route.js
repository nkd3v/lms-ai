"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./auth.route");
const course_route_1 = require("./course.route");
const router = express_1.default.Router();
exports.indexRouter = router;
router.use('/auth', auth_route_1.authRouter);
router.use('/courses', course_route_1.courseRouter);
