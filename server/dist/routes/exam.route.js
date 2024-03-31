"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examRouter = void 0;
const express_1 = __importDefault(require("express"));
const exam_controller_1 = require("../controllers/exam.controller");
const router = express_1.default.Router();
exports.examRouter = router;
router.post('/', exam_controller_1.createExamHandler);
router.get('/course/:courseId', exam_controller_1.getExamsByCourseIdHandler); // Get exams by course ID
