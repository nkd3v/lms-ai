import pool from '../config/database';
import { AssignmentSubmission } from '../models/assignment_submission.model';

export async function submitAssignment(submissionData: AssignmentSubmission) {
  try {
    const client = await pool.connect();

    try {
      await client.query('BEGIN'); // Start a transaction

      for (const userId of submissionData.user_ids) {
        const query = `
          INSERT INTO assignment_submissions 
             (user_id, assignment_id, data, submitted_at) 
          VALUES ($1, $2, $3, $4) 
        `; 

        // @ts-ignore
        await client.query(query, [
          userId, 
          submissionData.assignment_id,
          submissionData.data,
          new Date() // submitted_at
        ]);
      }
      
      await client.query('COMMIT'); // Commit changes if all insertions succeed
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error submitting assignment:', error);
    throw error;
  }
}

export async function getNonSubmittingLearners(courseId: number, assignmentId: number) {
  try {
    const query = `
      SELECT users.id, users.name, users.email 
      FROM users
      JOIN course_relations ON users.id = course_relations.user_id
      WHERE course_relations.course_id = $1 
        AND course_relations.role = 'learner'
        AND NOT EXISTS (
          SELECT 1
          FROM assignment_submissions 
          WHERE assignment_submissions.user_id = users.id 
             AND assignment_submissions.assignment_id = $2
        )
    `;

    const result = await pool.query(query, [courseId, assignmentId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching non-submitting learners:', error);
    throw error;
  }
}

export async function getAssignmentSubmission(userId: number, assignmentId: number) {
  try {
    const query = `
      SELECT * 
      FROM assignment_submissions 
      WHERE user_id = $1 
        AND assignment_id = $2
    `;

    const result = await pool.query(query, [userId, assignmentId]);
    return result.rows[0]; // Return the first (and likely only) result
  } catch (error) {
    console.error('Error fetching assignment submission:', error);
    throw error;
  }
}