import { Router } from 'express';
import { Users, DetailUsers, UpdateUsers, getUser } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', Users);
userRouter.get('/:id', getUser);
userRouter.post('/profile', DetailUsers);
userRouter.patch('/profile', UpdateUsers);

export default userRouter;