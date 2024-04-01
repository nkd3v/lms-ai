// attendance.service.ts
import pool from '../config/database';
import { Attendance } from '../models/attendance.model';

export async function recordAttendance(userId: number, courseId: number): Promise<Attendance> {
    try {
        const query = 'INSERT INTO attendances (user_id, course_id) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [userId, courseId]);
        // @ts-ignore
        return result.rows[0]; 
    } catch (error) {
        console.error('Error recording attendance:', error);
        throw error;
    }
}

export async function getAttendanceByCourseId(courseId: number, userId?: number): Promise<Attendance[]> {
    try {
        let query = 'SELECT * FROM attendances WHERE course_id = $1';
        const queryParams = [courseId];

        if (userId) {
            query += ' AND user_id = $2';
            queryParams.push(userId);
        }

        const result = await pool.query(query, queryParams);
        // @ts-ignore
        return result.rows;
    } catch (error) {
        console.error('Error fetching attendances by course ID:', error);
        throw error;
    }
}

