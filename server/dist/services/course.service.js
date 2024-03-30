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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersByCourse = exports.addUserToCourse = exports.getCourseByJoinCode = exports.createCourse = exports.getAllCourses = exports.getCoursesByLearner = exports.getCoursesByInstructor = void 0;
const database_1 = __importDefault(require("../config/database"));
function getCoursesByInstructor(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT c.* FROM courses c JOIN course_relations cr ON c.id = cr.course_id WHERE cr.user_id = $1 AND cr.role = $2';
            // @ts-ignore
            const result = yield database_1.default.query(query, [userId, 'instructor']);
            // @ts-ignore
            return result.rows;
        }
        catch (error) {
            console.error('Error fetching courses by instructor:', error);
            throw error;
        }
    });
}
exports.getCoursesByInstructor = getCoursesByInstructor;
function getCoursesByLearner(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT c.* FROM courses c JOIN course_relations cr ON c.id = cr.course_id WHERE cr.user_id = $1 AND cr.role = $2';
            // @ts-ignore
            const result = yield database_1.default.query(query, [userId, 'learner']);
            // @ts-ignore
            return result.rows;
        }
        catch (error) {
            console.error('Error fetching courses by learner:', error);
            throw error;
        }
    });
}
exports.getCoursesByLearner = getCoursesByLearner;
function getAllCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM courses';
            const result = yield database_1.default.query(query);
            return result.rows;
        }
        catch (error) {
            console.error('Error fetching all courses:', error);
            throw error;
        }
    });
}
exports.getAllCourses = getAllCourses;
function createCourse(course) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, instructor_id } = course;
            const icon_url = '/s4.jpg';
            const banner_url = '/s4.jpg';
            const joinCode = yield generateUniqueJoinCode();
            const query = 'INSERT INTO courses (name, icon_url, banner_url, join_code) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = yield database_1.default.query(query, [name, icon_url, banner_url, joinCode]);
            // Insert course relation for the instructor
            yield addUserToCourse({ user_id: instructor_id, course_id: result.rows[0].id, role: 'instructor' });
            return result.rows[0];
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    });
}
exports.createCourse = createCourse;
function generateUniqueJoinCode() {
    return __awaiter(this, void 0, void 0, function* () {
        let joinCode = '';
        while (true) {
            joinCode = yield generateRandomCode();
            const existingCourse = yield getCourseByJoinCode(joinCode);
            if (!existingCourse) {
                break;
            }
        }
        return joinCode;
    });
}
function generateRandomCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 7; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    });
}
function getCourseByJoinCode(joinCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM courses WHERE join_code = $1';
            const result = yield database_1.default.query(query, [joinCode]);
            return result.rows[0] || null;
        }
        catch (error) {
            console.error('Error fetching course by join code:', error);
            throw error;
        }
    });
}
exports.getCourseByJoinCode = getCourseByJoinCode;
function addUserToCourse(courseRelation) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, course_id, role } = courseRelation;
            const query = 'INSERT INTO course_relations (user_id, course_id, role) VALUES ($1, $2, $3)';
            yield database_1.default.query(query, [user_id, course_id, role]);
        }
        catch (error) {
            console.error('Error adding user to course:', error);
            throw error;
        }
    });
}
exports.addUserToCourse = addUserToCourse;
function listUsersByCourse(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
        SELECT cr.user_id, cr.role, u.name, u.picture_url 
        FROM course_relations cr 
        INNER JOIN users u ON cr.user_id = u.id 
        WHERE cr.course_id = $1`;
            const result = yield database_1.default.query(query, [courseId]);
            return result.rows;
        }
        catch (error) {
            console.error('Error listing users by course:', error);
            throw error;
        }
    });
}
exports.listUsersByCourse = listUsersByCourse;
