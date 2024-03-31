import { Request, Response } from 'express';
import { createAssignment, getAssignmentsByCourseId } from '../services/assignment.service';

export async function createAssignmentHandler(req: Request, res: Response) {
  try {
    const newAssignment = req.body;
    const createdAssignment = await createAssignment(newAssignment);

    res.status(201).json(createdAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment' });
  }
}

export async function getAssignmentsByCourseIdHandler(req: Request, res: Response) {
  try {
    const courseId = parseInt(req.params.courseId);

    const assignments = await getAssignmentsByCourseId(courseId);
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments' });
  }
}

// ... Add handlers for other routes as needed
