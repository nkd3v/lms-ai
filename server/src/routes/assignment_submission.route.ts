import express from 'express';
import { getNonSubmittingLearnersHandler, submitAssignmentHandler, getAssignmentSubmissionHandler } from '../controllers/assignment_submission.controller';

const router = express.Router();

router.post('/submit', submitAssignmentHandler);
router.get('/courses/:courseId/assignments/:assignmentId/non-submitting', getNonSubmittingLearnersHandler);
router.get('/users/:userId/assignments/:assignmentId', getAssignmentSubmissionHandler);

export { router as assignmentSubmissionRouter }; 
