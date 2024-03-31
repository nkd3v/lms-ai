import express from 'express';
import { getSubmissionByExamIdAndUserIdHandler, submitExamHandler } from '../controllers/exam_submission.controller';

const router = express.Router();

router.post('/submit', submitExamHandler);
router.get('/:examId/users/:userId', getSubmissionByExamIdAndUserIdHandler);
router.get('/:examId', getSubmissionByExamIdAndUserIdHandler);

export { router as examSubmissionRouter };
