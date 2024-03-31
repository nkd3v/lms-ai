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
    const { email, name, given_name, family_name, picture_url } = newUser;
    const query = 'INSERT INTO users (email, name, given_name, family_name, picture_url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await pool.query(query, [email, name, given_name, family_name, picture_url]);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the first matching user
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error; // Re-throw to allow for appropriate error handling
  }
}