import express from "express";
import { Lists, FindUsers } from '../controllers/list.js';
const router = express.Router();

router.get('/', Lists);
router.post('/users/:id', FindUsers);

export default router;