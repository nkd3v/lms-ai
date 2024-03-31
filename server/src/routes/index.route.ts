import express from 'express';
import { authRouter } from './auth.route';
import { courseRouter } from './course.route';
import { examRouter } from './exam.route';
import { proctorActivityRouter } from './proctorActivity.route';
import { FileRouter } from './file.route';
import { jwtAuth } from '../middleware/jwtAuth';
import { examSubmissionRouter } from './exam_submission.route';
import { userRouter } from './user.route';
import { assignmentSubmissionRouter } from './assignment_submission.route';
import { assignmentsRouter } from './assignment.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/courses', jwtAuth, courseRouter);
router.use('/exams/submissions', jwtAuth, examSubmissionRouter);
router.use('/exams', jwtAuth, examRouter);
router.use('/proctor', jwtAuth, proctorActivityRouter);
router.use('/users', jwtAuth, userRouter)
router.use('/file', jwtAuth, FileRouter);
router.use('/assignments/submissions', jwtAuth, assignmentSubmissionRouter);
router.use('/assignments', jwtAuth, assignmentsRouter);

export { router as indexRouter };
