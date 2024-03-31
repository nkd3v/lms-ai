import { Request, Response } from 'express';
import { createProctorActivity, getProctorActivitiesByExamId, getProctorActivityByExamIdAndUserId } from '../services/proctorActivity.service';

export const createProctorActivityHandler = async (req: Request, res: Response) => {
  try {
    const activity = req.body;

    if (!activity.user_id) {
      // @ts-ignore
      activity.user_id = req.user.id;
    }

    const createdActivity = await createProctorActivity(activity);
    res.status(201).json(createdActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating proctor activity' });
  }
};


export const getProctorActivitiesByExamIdHandler = async (req: Request, res: Response) => {
  try {
    const { examId } = req.params;
    const activities = await getProctorActivitiesByExamId(examId);
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching proctor activities' });
  }
};

export const getProctorActivityByExamIdAndUserIdHandler = async (req: Request, res: Response) => {
  try {
    const { examId, userId } = req.params;
    const activities = await getProctorActivityByExamIdAndUserId(examId, userId);
    if (!activities.length) {
      return res.status(404).json({ message: 'No proctor activities found' });
    }
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching proctor activities' });
  }
};
