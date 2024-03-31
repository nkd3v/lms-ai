import express from 'express';
import { createExamHandler, getExamsByCourseIdHandler } from '../controllers/exam.controller';

const router = express.Router();

router.post('/', createExamHandler);
router.get('/course/:courseId', getExamsByCourseIdHandler); // Get exams by course ID

export { router as examRouter };
