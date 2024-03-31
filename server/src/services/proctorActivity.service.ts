import pool from '../config/database';
import { ProctorActivity } from '../models/proctorActivity.model';

export async function createProctorActivity(activity: ProctorActivity): Promise<ProctorActivity> {
    try {
        const query = `
      INSERT INTO proctor_activities (exam_id, user_id, type, description, image_url, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
        // @ts-ignore
        const result = await pool.query(query, [
            activity.exam_id,
            activity.user_id,
            activity.type,
            activity.description,
            activity.image_url,
            new Date(),
        ]);
        // @ts-ignore
        return result.rows[0];
    } catch (error) {
        console.error('Error creating proctor activity:', error);
        throw error;
    }
}

export async function getProctorActivitiesByExamId(examId): Promise<ProctorActivity[]> {
    try {
        const query = 'SELECT * FROM proctor_activities WHERE exam_id = $1';
        const result = await pool.query(query, [examId]);
        return result.rows;
    } catch (error) {
        console.error('Error getting proctor activities:', error);
        throw error;
    }
}

export async function getProctorActivityByExamIdAndUserId(examId, userId): Promise<ProctorActivity[]> {
    try {
      const query = `
        SELECT * FROM proctor_activities 
        WHERE exam_id = $1 AND user_id = $2
      `;
      const result = await pool.query(query, [examId, userId]);
      return result.rows; // Return all rows as an array
    } catch (error) {
      console.error('Error getting proctor activity by exam ID and user ID:', error);
      throw error;
    }
  }
  