import { Router } from 'express';
import { Users, Register, Login, DetailUsers, UpdateUsers, DeleteUsers } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', Users);
userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.post('/profile', DetailUsers);
userRouter.patch('/profile', UpdateUsers);
userRouter.delete('/delete/:id', DeleteUsers);

export default userRouter;