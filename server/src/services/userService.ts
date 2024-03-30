import pool from '../config/database';
import { User } from '../models/user.model';

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export async function insertUser(newUser: User): Promise<User> {
  try {
    const { username, email } = newUser;
    const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [username, email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}
