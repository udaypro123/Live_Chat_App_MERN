import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { sendMessage } from "../controllers/message.controllers.js"


const router = Router()

router.route("/message").post(sendMessage)

export default router;