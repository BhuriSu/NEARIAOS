import express from "express";
import { 
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/profiles/:id', getUserById);
router.patch('/profiles/:id', updateUser);
router.delete('/profiles/:id', deleteUser);

export default router;