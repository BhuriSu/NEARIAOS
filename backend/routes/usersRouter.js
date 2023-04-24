import express from "express";
import { 
    getUserById,
    updateUser
} from "../controllers/user.js";
const router = express.Router();

router.get('/profiles/:id', getUserById);
router.patch('/profiles/:id', updateUser);


export default router;