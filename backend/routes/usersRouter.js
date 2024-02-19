import express from "express";
import { 
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;