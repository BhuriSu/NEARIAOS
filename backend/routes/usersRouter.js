import express from "express";
import { 
    getUsers,
    createUser,
    getUserById,
    updateUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);


export default router;