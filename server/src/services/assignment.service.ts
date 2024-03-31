import pool from '../config/database';
import { Assignment } from '../models/assignment.model';

export async function createAssignment(assignmentData: Assignment): Promise<Assignment> {
  try {
    const query = `
      INSERT INTO assignments (topic, description, course_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    // @ts-ignore
    const result = await pool.query(query, [assignmentData.topic, assignmentData.description, assignmentData.course_id]);
    // @ts-ignore
    return result.rows[0];
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
  }
}

export async function getAssignmentsByCourseId(courseId: number): Promise<Assignment[]> {
  try {
    const query = `
      SELECT * FROM assignments
      WHERE course_id = $1
    `;

    const result = await pool.query(query, [courseId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
}

// ... Add other service functions as needed (e.g., getAssignmentById, updateAssignment, deleteAssignment)
