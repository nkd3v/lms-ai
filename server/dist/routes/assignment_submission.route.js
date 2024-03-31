"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentSubmissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const assignment_submission_controller_1 = require("../controllers/assignment_submission.controller");
const router = express_1.default.Router();
exports.assignmentSubmissionRouter = router;
router.post('/submit', assignment_submission_controller_1.submitAssignmentHandler);
router.get('/courses/:courseId/assignments/:assignmentId/non-submitting', assignment_submission_controller_1.getNonSubmittingLearnersHandler);
router.get('/users/:userId/assignments/:assignmentId', assignment_submission_controller_1.getAssignmentSubmissionHandler);
