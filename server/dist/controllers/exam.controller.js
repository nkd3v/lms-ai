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
exports.getExamsByCourseIdHandler = exports.createExamHandler = void 0;
const exam_service_1 = require("../services/exam.service");
function createExamHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exam = req.body;
            const newExam = yield (0, exam_service_1.createExam)(exam);
            res.json(newExam);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating exam' });
        }
    });
}
exports.createExamHandler = createExamHandler;
function getExamsByCourseIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            const exams = yield (0, exam_service_1.getExamsByCourseId)(courseId);
            res.json(exams);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching exams' });
        }
    });
}
exports.getExamsByCourseIdHandler = getExamsByCourseIdHandler;
