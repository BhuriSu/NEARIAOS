import express from "express";
import { 
    getMessage,
    sendMessage
} from "../controllers/message.js";
const router = express.Router();

router.get('/', getMessage);
router.post('/', sendMessage);



export default router;