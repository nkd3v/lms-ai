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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamSubmissionByExamIdAndUserId = exports.submitExam = void 0;
const database_1 = __importDefault(require("../config/database"));
function submitExam(submissionData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      INSERT INTO exam_submissions 
        (user_id, exam_id, started_at, submitted_at) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
            // @ts-ignore
            const result = yield database_1.default.query(query, [
                submissionData.user_id,
                submissionData.exam_id,
                submissionData.started_at,
                submissionData.submitted_at
            ]);
            return result.rows[0];
        }
        catch (error) {
            console.error('Error submitting exam:', error);
            throw error;
        }
    });
}
exports.submitExam = submitExam;
function getExamSubmissionByExamIdAndUserId(examId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
       SELECT * FROM exam_submissions 
       WHERE exam_id = $1 AND user_id = $2
    `;
            const result = yield database_1.default.query(query, [examId, userId]);
            return result.rows.length > 0 ? result.rows[0] : null;
        }
        catch (error) {
            console.error('Error getting exam submission:', error);
            throw error;
        }
    });
}
exports.getExamSubmissionByExamIdAndUserId = getExamSubmissionByExamIdAndUserId;
