import { Router } from 'express';
import { UpdateUsers } from '../controllers/users.js';
const userRouter = Router();
userRouter.patch('/profile', UpdateUsers);
export default userRouter;