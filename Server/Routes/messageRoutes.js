import express from "express"
import { protectRoute } from "../middleware/auth.js"
import { getMessage, getUserForSideBar, markMessageAsSeen, sendMessage, } from "../controllers/messageController.js"

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSideBar);
messageRouter.get("/:id", protectRoute, getMessage);
messageRouter.get("mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter;
