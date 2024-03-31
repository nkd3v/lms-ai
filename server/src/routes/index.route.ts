import express from 'express';
import { authRouter } from './auth.route';
import { courseRouter } from './course.route';
import { examRouter } from './exam.route';
import { proctorActivityRouter } from './proctorActivity.route';
import { FileRouter } from './file.route';
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/courses', jwtAuth, courseRouter);
router.use('/exams', jwtAuth, examRouter);
router.use('/proctor', jwtAuth, proctorActivityRouter);
router.use('/file', jwtAuth, FileRouter);

export { router as indexRouter };
