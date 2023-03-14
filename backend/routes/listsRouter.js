import { Router } from 'express';
import { Lists, FindUsers } from '../controllers/list.js';

const listRouter = Router();

listRouter.get('/', Lists);
listRouter.post('/users', FindUsers);

export default listRouter;