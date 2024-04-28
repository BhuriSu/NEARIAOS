import express from "express";
import { 
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.post('/create', createUser);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;