import { Router } from 'express';
import { Users, DetailUsers, UpdateUsers } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', Users);
userRouter.post('/profile', DetailUsers);
userRouter.patch('/profile', UpdateUsers);

export default userRouter;