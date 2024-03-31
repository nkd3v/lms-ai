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
exports.getAssignmentsByCourseIdHandler = exports.createAssignmentHandler = void 0;
const assignment_service_1 = require("../services/assignment.service");
function createAssignmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAssignment = req.body;
            const createdAssignment = yield (0, assignment_service_1.createAssignment)(newAssignment);
            res.status(201).json(createdAssignment);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating assignment' });
        }
    });
}
exports.createAssignmentHandler = createAssignmentHandler;
function getAssignmentsByCourseIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = parseInt(req.params.courseId);
            const assignments = yield (0, assignment_service_1.getAssignmentsByCourseId)(courseId);
            res.json(assignments);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching assignments' });
        }
    });
}
exports.getAssignmentsByCourseIdHandler = getAssignmentsByCourseIdHandler;
// ... Add handlers for other routes as needed
