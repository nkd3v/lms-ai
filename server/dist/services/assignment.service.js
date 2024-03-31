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
exports.getAssignmentsByCourseId = exports.createAssignment = void 0;
const database_1 = __importDefault(require("../config/database"));
function createAssignment(assignmentData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      INSERT INTO assignments (topic, description, course_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
            // @ts-ignore
            const result = yield database_1.default.query(query, [assignmentData.topic, assignmentData.description, assignmentData.course_id]);
            // @ts-ignore
            return result.rows[0];
        }
        catch (error) {
            console.error('Error creating assignment:', error);
            throw error;
        }
    });
}
exports.createAssignment = createAssignment;
function getAssignmentsByCourseId(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      SELECT * FROM assignments
      WHERE course_id = $1
    `;
            const result = yield database_1.default.query(query, [courseId]);
            return result.rows;
        }
        catch (error) {
            console.error('Error fetching assignments:', error);
            throw error;
        }
    });
}
exports.getAssignmentsByCourseId = getAssignmentsByCourseId;
// ... Add other service functions as needed (e.g., getAssignmentById, updateAssignment, deleteAssignment)
