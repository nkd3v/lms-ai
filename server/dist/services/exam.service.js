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
exports.getExamsByCourseId = exports.createExam = void 0;
const database_1 = __importDefault(require("../config/database"));
function createExam(examData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO exams (topic, description, course_id) VALUES ($1, $2, $3) RETURNING *`;
            const result = yield database_1.default.query(query, [examData.topic, examData.description, examData.course_id]);
            return result.rows[0];
        }
        catch (error) {
            console.error('Error creating exam:', error);
            throw error;
        }
    });
}
exports.createExam = createExam;
function getExamsByCourseId(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM exams WHERE course_id = $1';
            const result = yield database_1.default.query(query, [courseId]);
            return result.rows;
        }
        catch (error) {
            console.error('Error fetching exams by course ID:', error);
            throw error;
        }
    });
}
exports.getExamsByCourseId = getExamsByCourseId;
