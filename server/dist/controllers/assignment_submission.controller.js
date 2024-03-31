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
exports.getAssignmentSubmissionHandler = exports.getNonSubmittingLearnersHandler = exports.submitAssignmentHandler = void 0;
const assignment_submission_service_1 = require("../services/assignment_submission.service");
function submitAssignmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const submission = req.body;
            // Ensure the presence of 'user_ids' 
            if (!Array.isArray(submission.user_ids) || submission.user_ids.length === 0) {
                return res.status(400).json({ message: 'Invalid submission data. Must include user_ids' });
            }
            yield (0, assignment_submission_service_1.submitAssignment)(submission);
            res.json({ message: 'Assignment submitted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error submitting assignment' });
        }
    });
}
exports.submitAssignmentHandler = submitAssignmentHandler;
function getNonSubmittingLearnersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = parseInt(req.params.courseId);
            const assignmentId = parseInt(req.params.assignmentId);
            if (isNaN(courseId) || isNaN(assignmentId)) {
                return res.status(400).json({ message: 'Invalid courseId or assignmentId' });
            }
            const learners = yield (0, assignment_submission_service_1.getNonSubmittingLearners)(courseId, assignmentId);
            res.json(learners);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching non-submitting learners' });
        }
    });
}
exports.getNonSubmittingLearnersHandler = getNonSubmittingLearnersHandler;
function getAssignmentSubmissionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.userId);
            const assignmentId = parseInt(req.params.assignmentId);
            if (isNaN(userId) || isNaN(assignmentId)) {
                return res.status(400).json({ message: 'Invalid userId or assignmentId' });
            }
            const submission = yield (0, assignment_submission_service_1.getAssignmentSubmission)(userId, assignmentId);
            if (submission) {
                res.json(submission);
            }
            else {
                res.status(404).json({ message: 'Assignment submission not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching assignment submission' });
        }
    });
}
exports.getAssignmentSubmissionHandler = getAssignmentSubmissionHandler;
