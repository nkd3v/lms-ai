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
exports.getProctorActivityByExamIdAndUserId = exports.getProctorActivitiesByExamId = exports.createProctorActivity = void 0;
const database_1 = __importDefault(require("../config/database"));
function createProctorActivity(activity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      INSERT INTO proctor_activities (exam_id, user_id, type, description, image_url, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
            // @ts-ignore
            const result = yield database_1.default.query(query, [
                activity.exam_id,
                activity.user_id,
                activity.type,
                activity.description,
                activity.image_url,
                new Date(),
            ]);
            // @ts-ignore
            return result.rows[0];
        }
        catch (error) {
            console.error('Error creating proctor activity:', error);
            throw error;
        }
    });
}
exports.createProctorActivity = createProctorActivity;
function getProctorActivitiesByExamId(examId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM proctor_activities WHERE exam_id = $1';
            const result = yield database_1.default.query(query, [examId]);
            return result.rows;
        }
        catch (error) {
            console.error('Error getting proctor activities:', error);
            throw error;
        }
    });
}
exports.getProctorActivitiesByExamId = getProctorActivitiesByExamId;
function getProctorActivityByExamIdAndUserId(examId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
        SELECT * FROM proctor_activities 
        WHERE exam_id = $1 AND user_id = $2
      `;
            const result = yield database_1.default.query(query, [examId, userId]);
            return result.rows; // Return all rows as an array
        }
        catch (error) {
            console.error('Error getting proctor activity by exam ID and user ID:', error);
            throw error;
        }
    });
}
exports.getProctorActivityByExamIdAndUserId = getProctorActivityByExamIdAndUserId;
