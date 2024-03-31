import { Request, Response } from 'express';
import { getUserById } from '../services/user.service';

export async function getUserByIdHandler(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId; 

  try {
    const user = await getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
}
