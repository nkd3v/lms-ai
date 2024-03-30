import { Request, Response } from 'express';
import { getAllCourses, getCoursesByInstructor, getCoursesByLearner, getCourseByJoinCode, listUsersByCourse, createCourse, addUserToCourse } from '../services/course.service';

export async function getCoursesByInstructorHandler(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;
  try {
    const courses = await getCoursesByInstructor(parseInt(userId));
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses by instructor' });
  }
}

export async function getCoursesByLearnerHandler(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;
  try {
    const courses = await getCoursesByLearner(parseInt(userId));
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses by learner' });
  }
}

export async function getAllCoursesHandler(req: Request, res: Response): Promise<void> {
  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all courses' });
  }
}

export async function getUsersByCourse(req: Request, res: Response): Promise<void> {
  const courseId = req.params.courseId;
  try {
    const users = await listUsersByCourse(courseId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error listing users by course' });
  }
}

export async function createCourseHandler(req: Request, res: Response): Promise<void> {
  const course = {
    ...req.body,
    // @ts-ignore
    instructor_id: req.user.id
  };
  try {
    const createdCourse = await createCourse(course);
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course' });
  }
}

export async function addUserToCourseHandler(req: Request, res: Response): Promise<void> {
  const courseRelation = req.body;
  try {
    await addUserToCourse(courseRelation);
    res.status(201).json({ message: 'User added to course successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to course' });
  }
}

export async function joinCourseByCode(req: Request, res: Response): Promise<void> {
  const { code } = req.body;
  try {
    const course = await getCourseByJoinCode(code);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    // @ts-ignore
    await addUserToCourse({course_id: course.id, user_id: req.user.id, role: 'learner'});
    res.status(201).json({ message: 'User added to course successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining course by code' });
  }
}
