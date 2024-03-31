"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const assignment_controller_1 = require("../controllers/assignment.controller");
const router = express_1.default.Router();
exports.assignmentsRouter = router;
router.post('/', assignment_controller_1.createAssignmentHandler);
router.get('/courses/:courseId', assignment_controller_1.getAssignmentsByCourseIdHandler);
