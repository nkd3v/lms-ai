import express from 'express';
import { createAssignmentHandler, getAssignmentsByCourseIdHandler } from '../controllers/assignment.controller';

const router = express.Router();

router.post('/', createAssignmentHandler);
router.get('/courses/:courseId', getAssignmentsByCourseIdHandler);

export { router as assignmentsRouter }; 
