import express from "express";
import { 
    getUser,
    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/:userId', getUser);
router.patch('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;