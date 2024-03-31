"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmissionByExamIdAndUserIdHandler = exports.submitExamHandler = void 0;
const exam_submission_service_1 = require("../services/exam_submission.service");
function submitExamHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const submission = req.body;
            // @ts-ignore
            const currentUserId = req.user.id;
            if (!submission.user_id && currentUserId) {
                submission.user_id = currentUserId;
            }
            console.log(submission);
            const submittedExam = yield (0, exam_submission_service_1.submitExam)(submission);
            res.json(submittedExam);
        }
        catch (error) {
            res.status(500).json({ message: 'Error submitting exam' });
        }
    });
}
exports.submitExamHandler = submitExamHandler;
function getSubmissionByExamIdAndUserIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const examId = req.params.examId;
            // @ts-ignore
            const userId = req.params.userId || req.user.id;
            const submission = yield (0, exam_submission_service_1.getExamSubmissionByExamIdAndUserId)(examId, userId);
            if (submission) {
                res.json(submission);
            }
            else {
                res.status(404).json({ message: 'Exam submission not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching exam submission' });
        }
    });
}
exports.getSubmissionByExamIdAndUserIdHandler = getSubmissionByExamIdAndUserIdHandler;
