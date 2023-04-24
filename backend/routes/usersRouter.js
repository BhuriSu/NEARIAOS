import express from "express";
import { 
    getUsers,
    getUserById,
//  CreateUser,
    updateUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/listUsers', getUsers);
router.get('/profiles/:id', getUserById);
//router.post('/profiles', CreateUser);
router.patch('/profiles/:id', updateUser);

export default router;