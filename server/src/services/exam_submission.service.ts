import pool from '../config/database';
import { ExamSubmission } from '../models/exam_submission.model';

export async function submitExam(submissionData: ExamSubmission) {
  try {
    const query = `
      INSERT INTO exam_submissions 
        (user_id, exam_id, started_at, submitted_at) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    // @ts-ignore
    const result = await pool.query(query, [
      submissionData.user_id, 
      submissionData.exam_id, 
      submissionData.started_at,
      submissionData.submitted_at
    ]);

    return result.rows[0]; 
  } catch (error) {
    console.error('Error submitting exam:', error);
    throw error;
  }
}

export async function getExamSubmissionByExamIdAndUserId(examId: string, userId: string): Promise<ExamSubmission | null> {
  try {
    const query = `
       SELECT * FROM exam_submissions 
       WHERE exam_id = $1 AND user_id = $2
    `;
    const result = await pool.query(query, [examId, userId]);

    return result.rows.length > 0 ? result.rows[0] : null; 
  } catch (error) {
    console.error('Error getting exam submission:', error);
    throw error;
  }
}
