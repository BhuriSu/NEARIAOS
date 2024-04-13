import express from "express";
import { 
    createUser,
    updateUser,
    deleteUser,
    checkExistingImage
} from "../controllers/user.js";

const router = express.Router();

router.get('/checkImage', checkExistingImage);
router.post('/create', createUser);
router.patch('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;