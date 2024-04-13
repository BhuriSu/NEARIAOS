import express from "express";
import { 
 //   getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();

//router.get('/:userId', getUser);
router.post('/create', createUser);
router.patch('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;