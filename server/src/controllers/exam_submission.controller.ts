import { Request, Response } from 'express';
import { getExamSubmissionByExamIdAndUserId, submitExam } from '../services/exam_submission.service';

export async function submitExamHandler(req: Request, res: Response) {
    try {
        const submission = req.body;

        // @ts-ignore
        const currentUserId = req.user.id;

        if (!submission.user_id && currentUserId) {
            submission.user_id = currentUserId;
        }
        console.log(submission);

        const submittedExam = await submitExam(submission);
        res.json(submittedExam);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting exam' });
    }
}

export async function getSubmissionByExamIdAndUserIdHandler(req: Request, res: Response) {
  try {
    const examId = req.params.examId;
    // @ts-ignore
    const userId = req.params.userId || req.user.id;

    const submission = await getExamSubmissionByExamIdAndUserId(examId, userId);

    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ message: 'Exam submission not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam submission' });
  }
}
