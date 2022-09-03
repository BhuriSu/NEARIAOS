import { Router } from 'express';
import { GetChat , FindChat } from '../controllers/database';

const userRouter = Router();

userRouter.post('/', GetChat);
userRouter.get('/:id', FindChat);

export default userRouter;