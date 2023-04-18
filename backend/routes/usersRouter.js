import express from "express";
import { 
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/profiles/:id', getUserById);
router.post('/profiles', saveUser);
router.patch('/profiles/:id', updateUser);
router.delete('/profiles/:id', deleteUser);

export default router;