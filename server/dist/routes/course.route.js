"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const router = express_1.default.Router();
exports.courseRouter = router;
router.post('/', course_controller_1.createCourseHandler);
router.post('/:courseId/add-user', course_controller_1.addUserToCourseHandler);
router.get('/:courseId/users', course_controller_1.getUsersByCourse);
router.post('/join-by-code', course_controller_1.joinCourseByCode);
router.get('/instructor/:userId', course_controller_1.getCoursesByInstructorHandler);
router.get('/learner/:userId', course_controller_1.getCoursesByLearnerHandler);
router.get('/', course_controller_1.getAllCoursesHandler);
