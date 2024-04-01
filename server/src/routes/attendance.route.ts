// attendance.route.ts
import express from 'express';
import { recordAttendanceHandler, getAttendanceByCourseIdHandler } from '../controllers/attendance.controller';

const router = express.Router();

router.post('/', recordAttendanceHandler);
router.get('/:courseId', getAttendanceByCourseIdHandler); 

export { router as attendanceRouter };
