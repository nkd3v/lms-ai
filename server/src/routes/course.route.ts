import express from 'express';
import { getAllCoursesHandler, getCoursesByInstructorHandler, getCoursesByLearnerHandler, joinCourseByCode, getUsersByCourse, createCourseHandler, addUserToCourseHandler } from '../controllers/course.controller';

const router = express.Router();

router.post('/', createCourseHandler);
router.post('/:courseId/add-user', addUserToCourseHandler);
router.get('/:courseId/users', getUsersByCourse);
router.post('/join-by-code', joinCourseByCode);
router.get('/instructor/:userId?', getCoursesByInstructorHandler);
router.get('/learner/:userId?', getCoursesByLearnerHandler);
router.get('/', getAllCoursesHandler);

export { router as courseRouter };
