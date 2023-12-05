import express from "express";
import { 
    createUser,
    getUserById,
    updateUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/:id', getUserById);
router.post('/create', createUser);
router.patch('/:id', updateUser);


export default router;