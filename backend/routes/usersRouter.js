import express from "express";
import { 
    getUsers,
    createUser,
    getUserById,
    updateUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/listUsers', getUsers);
router.get('/profiles/:id', getUserById);
router.post('/profiles', createUser);
router.patch('/profiles/:id', updateUser);


export default router;