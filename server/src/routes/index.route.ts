import express from 'express';
import { authRouter } from './auth.route';
import { courseRouter } from './course.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/courses', courseRouter);

export { router as indexRouter };
