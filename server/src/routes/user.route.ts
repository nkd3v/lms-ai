import express from 'express';
import { getUserByIdHandler } from '../controllers/user.controller';

const router = express.Router();

router.get('/:userId', getUserByIdHandler); 

export { router as userRouter };
