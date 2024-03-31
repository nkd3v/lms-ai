import pool from '../config/database';
import { Course, CourseRelation } from '../models/course.model';

export async function getCoursesByInstructor(userId: number): Promise<Course[]> {
  try {
    const query = 'SELECT c.* FROM courses c JOIN course_relations cr ON c.id = cr.course_id WHERE cr.user_id = $1 AND cr.role = $2';
    // @ts-ignore
    const result = await pool.query(query, [userId, 'instructor']);
    // @ts-ignore
    return result.rows;
  } catch (error) {
    console.error('Error fetching courses by instructor:', error);
    throw error;
  }
}

export async function getCoursesByLearner(userId: number): Promise<Course[]> {
  try {
    const query = 'SELECT c.* FROM courses c JOIN course_relations cr ON c.id = cr.course_id WHERE cr.user_id = $1 AND cr.role = $2';
    // @ts-ignore
    const result = await pool.query(query, [userId, 'learner']);
    // @ts-ignore
    return result.rows;
  } catch (error) {
    console.error('Error fetching courses by learner:', error);
    throw error;
  }
}

export async function getAllCourses(): Promise<Course[]> {
  try {
    const query = 'SELECT * FROM courses';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

export async function createCourse(course): Promise<Course> {
  try {
    const { name, instructor_id } = course;
    const icon_url = '/s4.jpg';
    const banner_url = '/s4.jpg';
    const joinCode = await generateUniqueJoinCode();
    const query = 'INSERT INTO courses (name, icon_url, banner_url, join_code) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [name, icon_url, banner_url, joinCode]);

    // Insert course relation for the instructor
    await addUserToCourse({ user_id: instructor_id, course_id: result.rows[0].id, role: 'instructor' });

    return result.rows[0];
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

async function generateUniqueJoinCode(): Promise<string> {
  let joinCode = '';
  while (true) {
    joinCode = await generateRandomCode();
    const existingCourse = await getCourseByJoinCode(joinCode);
    if (!existingCourse) {
      break;
    }
  }
  return joinCode;
}

async function generateRandomCode(): Promise<string> {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 7; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

export async function getCourseByJoinCode(joinCode: string): Promise<Course | null> {
  try {
    const query = 'SELECT * FROM courses WHERE join_code = $1';
    const result = await pool.query(query, [joinCode]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching course by join code:', error);
    throw error;
  }
}

export async function addUserToCourse(courseRelation: CourseRelation): Promise<void> {
  try {
    const { user_id, course_id, role } = courseRelation;
    const query = 'INSERT INTO course_relations (user_id, course_id, role) VALUES ($1, $2, $3)';
    await pool.query(query, [user_id, course_id, role]);
  } catch (error) {
    console.error('Error adding user to course:', error);
    throw error;
  }
}

export async function listUsersByCourse(courseId: string): Promise<{ user_id: string; role: string; name: string; picture_url: string }[]> {
  try {
    const query = `
        SELECT cr.user_id, cr.role, u.name, u.picture_url 
        FROM course_relations cr 
        INNER JOIN users u ON cr.user_id = u.id 
        WHERE cr.course_id = $1`;
    const result = await pool.query(query, [courseId]);
    return result.rows;
  } catch (error) {
    console.error('Error listing users by course:', error);
    throw error;
  }
}
