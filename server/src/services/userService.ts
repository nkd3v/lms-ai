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
    const { id, email, name, given_name, family_name, picture_url } = newUser;
    const query = 'INSERT INTO users (id, email, name, given_name, family_name, picture_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await pool.query(query, [id, email, name, given_name, family_name, picture_url]);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}
