import express from "express";
import { 
    sendMessage,
    getMessages,
    getConversations
} from "../controllers/message.js";
const router = express.Router();

router.get("/", getConversations);
router.post("/:id", sendMessage);
router.get("/:id", getMessages);



export default router;