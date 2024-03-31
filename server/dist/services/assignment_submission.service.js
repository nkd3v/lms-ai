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
exports.getAssignmentSubmission = exports.getNonSubmittingLearners = exports.submitAssignment = void 0;
const database_1 = __importDefault(require("../config/database"));
function submitAssignment(submissionData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield database_1.default.connect();
            try {
                yield client.query('BEGIN'); // Start a transaction
                for (const userId of submissionData.user_ids) {
                    const query = `
          INSERT INTO assignment_submissions 
             (user_id, assignment_id, data, submitted_at) 
          VALUES ($1, $2, $3, $4) 
        `;
                    // @ts-ignore
                    yield client.query(query, [
                        userId,
                        submissionData.assignment_id,
                        submissionData.data,
                        new Date() // submitted_at
                    ]);
                }
                yield client.query('COMMIT'); // Commit changes if all insertions succeed
            }
            catch (err) {
                yield client.query('ROLLBACK');
                throw err;
            }
            finally {
                client.release();
            }
        }
        catch (error) {
            console.error('Error submitting assignment:', error);
            throw error;
        }
    });
}
exports.submitAssignment = submitAssignment;
function getNonSubmittingLearners(courseId, assignmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      SELECT users.id, users.name, users.email 
      FROM users
      JOIN course_relations ON users.id = course_relations.user_id
      WHERE course_relations.course_id = $1 
        AND course_relations.role = 'learner'
        AND NOT EXISTS (
          SELECT 1
          FROM assignment_submissions 
          WHERE assignment_submissions.user_id = users.id 
             AND assignment_submissions.assignment_id = $2
        )
    `;
            const result = yield database_1.default.query(query, [courseId, assignmentId]);
            return result.rows;
        }
        catch (error) {
            console.error('Error fetching non-submitting learners:', error);
            throw error;
        }
    });
}
exports.getNonSubmittingLearners = getNonSubmittingLearners;
function getAssignmentSubmission(userId, assignmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      SELECT * 
      FROM assignment_submissions 
      WHERE user_id = $1 
        AND assignment_id = $2
    `;
            const result = yield database_1.default.query(query, [userId, assignmentId]);
            return result.rows[0]; // Return the first (and likely only) result
        }
        catch (error) {
            console.error('Error fetching assignment submission:', error);
            throw error;
        }
    });
}
exports.getAssignmentSubmission = getAssignmentSubmission;
