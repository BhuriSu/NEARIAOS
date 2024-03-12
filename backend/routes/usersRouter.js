import express from "express";
import { 

    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();


router.patch('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;