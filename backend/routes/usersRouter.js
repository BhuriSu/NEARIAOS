import express from "express";
import { 
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.post('/create', createUser);
router.patch('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;