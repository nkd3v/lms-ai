"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinCourseByCode = exports.addUserToCourseHandler = exports.createCourseHandler = exports.getUsersByCourse = exports.getAllCoursesHandler = exports.getCoursesByLearnerHandler = exports.getCoursesByInstructorHandler = void 0;
const course_service_1 = require("../services/course.service");
function getCoursesByInstructorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // @ts-ignore
        const userId = (_a = req.params.userId) !== null && _a !== void 0 ? _a : req.user.id;
        try {
            const courses = yield (0, course_service_1.getCoursesByInstructor)(parseInt(userId));
            res.status(200).json(courses);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching courses by instructor' });
        }
    });
}
exports.getCoursesByInstructorHandler = getCoursesByInstructorHandler;
function getCoursesByLearnerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // @ts-ignore
        const userId = (_a = req.params.userId) !== null && _a !== void 0 ? _a : req.user.id;
        try {
            const courses = yield (0, course_service_1.getCoursesByLearner)(parseInt(userId));
            res.status(200).json(courses);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching courses by learner' });
        }
    });
}
exports.getCoursesByLearnerHandler = getCoursesByLearnerHandler;
function getAllCoursesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield (0, course_service_1.getAllCourses)();
            res.status(200).json(courses);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching all courses' });
        }
    });
}
exports.getAllCoursesHandler = getAllCoursesHandler;
function getUsersByCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseId = req.params.courseId;
        try {
            const users = yield (0, course_service_1.listUsersByCourse)(courseId);
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: 'Error listing users by course' });
        }
    });
}
exports.getUsersByCourse = getUsersByCourse;
function createCourseHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = Object.assign(Object.assign({}, req.body), { 
            // @ts-ignore
            instructor_id: req.user.id });
        try {
            const createdCourse = yield (0, course_service_1.createCourse)(course);
            res.status(201).json(createdCourse);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating course' });
        }
    });
}
exports.createCourseHandler = createCourseHandler;
function addUserToCourseHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseRelation = req.body;
        try {
            yield (0, course_service_1.addUserToCourse)(courseRelation);
            res.status(201).json({ message: 'User added to course successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error adding user to course' });
        }
    });
}
exports.addUserToCourseHandler = addUserToCourseHandler;
function joinCourseByCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code } = req.body;
        try {
            const course = yield (0, course_service_1.getCourseByJoinCode)(code);
            if (!course) {
                res.status(404).json({ message: 'Course not found' });
                return;
            }
            // @ts-ignore
            yield (0, course_service_1.addUserToCourse)({ course_id: course.id, user_id: req.user.id, role: 'learner' });
            res.status(201).json({ message: 'User added to course successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error joining course by code' });
        }
    });
}
exports.joinCourseByCode = joinCourseByCode;
