// attendance.controller.ts
import { Request, Response } from 'express';
import { recordAttendance, getAttendanceByCourseId } from '../services/attendance.service';

export async function recordAttendanceHandler(req: Request, res: Response): Promise<void> {
    // @ts-ignore
  const userId = parseInt(req.body.userId) || req.user.id;
  const courseId = parseInt(req.body.courseId);

  try {
    const attendance = await recordAttendance(userId, courseId);
    res.status(201).json(attendance); 
  } catch (error) {
    res.status(500).json({ message: 'Error recording attendance' });
  }
}

export async function getAttendanceByCourseIdHandler(req: Request, res: Response): Promise<void> {
    const courseId = parseInt(req.params.courseId);
    // @ts-ignore
    const userId = req.query.userId ? parseInt(req.query.userId) : undefined; // From query parameter

    try {
        const attendances = await getAttendanceByCourseId(courseId, userId);
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendances by course ID' });
    }
}
