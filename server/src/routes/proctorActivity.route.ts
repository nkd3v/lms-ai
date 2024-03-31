import { Router } from 'express';
import { createProctorActivityHandler, getProctorActivitiesByExamIdHandler, getProctorActivityByExamIdAndUserIdHandler } from '../controllers/proctorActivity.controller';

const router = Router();

router.post('/', createProctorActivityHandler);
router.get('/exams/:examId', getProctorActivitiesByExamIdHandler);
router.get('/exams/:examId/users/:userId', getProctorActivityByExamIdAndUserIdHandler);

export { router as proctorActivityRouter };