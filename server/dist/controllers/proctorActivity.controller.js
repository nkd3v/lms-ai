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
exports.getProctorActivityByExamIdAndUserIdHandler = exports.getProctorActivitiesByExamIdHandler = exports.createProctorActivityHandler = void 0;
const proctorActivity_service_1 = require("../services/proctorActivity.service");
const createProctorActivityHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = req.body;
        if (!activity.user_id) {
            // @ts-ignore
            activity.user_id = req.user.id;
        }
        const createdActivity = yield (0, proctorActivity_service_1.createProctorActivity)(activity);
        res.status(201).json(createdActivity);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating proctor activity' });
    }
});
exports.createProctorActivityHandler = createProctorActivityHandler;
const getProctorActivitiesByExamIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examId } = req.params;
        const activities = yield (0, proctorActivity_service_1.getProctorActivitiesByExamId)(examId);
        res.json(activities);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching proctor activities' });
    }
});
exports.getProctorActivitiesByExamIdHandler = getProctorActivitiesByExamIdHandler;
const getProctorActivityByExamIdAndUserIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examId, userId } = req.params;
        const activities = yield (0, proctorActivity_service_1.getProctorActivityByExamIdAndUserId)(examId, userId);
        if (!activities.length) {
            return res.status(200).json([]);
        }
        res.json(activities);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching proctor activities' });
    }
});
exports.getProctorActivityByExamIdAndUserIdHandler = getProctorActivityByExamIdAndUserIdHandler;
