import { Router } from 'express';
import { Lists, FindUsers } from '../controllers/lists.js';

const userRouter = Router();

userRouter.get('/', Lists);
userRouter.post('/users', FindUsers);

export default userRouter;