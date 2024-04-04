import express from "express";
import { 
    test,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/test', test);
router.get('/', getUser);
router.patch('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;