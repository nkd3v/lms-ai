import pool from '../config/database';
import { Exam } from '../models/exam.model';

export async function createExam(examData: Exam): Promise<Exam> {
  try {
    const query = `INSERT INTO exams (topic, description, course_id) VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(query, [examData.topic, examData.description, examData.course_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating exam:', error);
    throw error;
  }
}

export async function getExamsByCourseId(courseId: string): Promise<Exam[]> {
  try {
    const query = 'SELECT * FROM exams WHERE course_id = $1';
    const result = await pool.query(query, [courseId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching exams by course ID:', error);
    throw error;
  }
}
