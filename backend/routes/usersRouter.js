import { Router } from 'express';
import { UpdateUsers } from '../controllers/users.js';
const userRouter = Router();
userRouter.put('/:id', UpdateUsers);
export default userRouter;