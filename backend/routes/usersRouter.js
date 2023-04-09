import express from "express";
import { 
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/profile/:id', getUserById);
router.post('/profile', saveUser);
router.patch('/profile/:id', updateUser);
router.delete('/profile/:id', deleteUser);

export default router;