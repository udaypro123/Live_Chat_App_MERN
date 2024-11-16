import { Router } from "express"
import { logginUser, registerUser,logoutUser, refreshAccessToken , getUser} from "../controllers/user.controllers.js"
import { upload } from "../middleware/multer.middleware.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(logginUser)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/getUser").get(getUser)

router.route("/refreshToken").post(refreshAccessToken)

export default router;
