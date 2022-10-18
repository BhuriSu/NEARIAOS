import { Router } from 'express';
import { Users, DetailUsers, UpdateUsers, DeleteUsers } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', Users);
userRouter.put('/profile', DetailUsers);
userRouter.patch('/profile', UpdateUsers);
userRouter.delete('/delete/:id', DeleteUsers);

export default userRouter;