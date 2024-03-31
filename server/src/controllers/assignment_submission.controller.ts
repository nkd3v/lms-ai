import { Request, Response } from 'express';
import { submitAssignment, getNonSubmittingLearners, getAssignmentSubmission } from '../services/assignment_submission.service';

export async function submitAssignmentHandler(req: Request, res: Response) {
  try {
    const submission = req.body;

    // Ensure the presence of 'user_ids' 
    if (!Array.isArray(submission.user_ids) || submission.user_ids.length === 0) {
        return res.status(400).json({ message: 'Invalid submission data. Must include user_ids' });
    }

    await submitAssignment(submission);
    res.json({ message: 'Assignment submitted successfully' }); 
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment' });
  }
}

export async function getNonSubmittingLearnersHandler(req: Request, res: Response) {
  try {
    const courseId = parseInt(req.params.courseId);
    const assignmentId = parseInt(req.params.assignmentId);

    if (isNaN(courseId) || isNaN(assignmentId)) {
      return res.status(400).json({ message: 'Invalid courseId or assignmentId' });
    }

    const learners = await getNonSubmittingLearners(courseId, assignmentId);
    res.json(learners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching non-submitting learners' });
  }
}

export async function getAssignmentSubmissionHandler(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    const assignmentId = parseInt(req.params.assignmentId);

    if (isNaN(userId) || isNaN(assignmentId)) {
      return res.status(400).json({ message: 'Invalid userId or assignmentId' });
    }

    const submission = await getAssignmentSubmission(userId, assignmentId);

    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ message: 'Assignment submission not found' }); 
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment submission' });
  }
}
