"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examSubmissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const exam_submission_controller_1 = require("../controllers/exam_submission.controller");
const router = express_1.default.Router();
exports.examSubmissionRouter = router;
router.post('/submit', exam_submission_controller_1.submitExamHandler);
router.get('/:examId/users/:userId', exam_submission_controller_1.getSubmissionByExamIdAndUserIdHandler);
router.get('/:examId', exam_submission_controller_1.getSubmissionByExamIdAndUserIdHandler);
