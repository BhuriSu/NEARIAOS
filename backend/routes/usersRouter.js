import express from "express";
import { 
    createUser,
    getUser, 
    updateUser,
    deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get('/:userId', getUser);
router.post('/create', createUser);
router.put('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;