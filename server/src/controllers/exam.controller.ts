import { Request, Response } from 'express';
import { createExam, getExamsByCourseId } from '../services/exam.service';

export async function createExamHandler(req: Request, res: Response) {
  try {
    const exam = req.body;
    const newExam = await createExam(exam);
    res.json(newExam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating exam' });
  }
}

export async function getExamsByCourseIdHandler(req: Request, res: Response) {
  try {
    const courseId = req.params.courseId;
    const exams = await getExamsByCourseId(courseId);
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams' });
  }
}
