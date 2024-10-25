import express from "express";
import { 
    createUser,
    getUser, 
    updateUser,
    deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get('/:id', getUser);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;