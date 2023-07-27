import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import * as validators from "./auth.validation.js";
import * as authController from "./controller/auth.js"
import { auth } from "../../middleware/auth.js";




const authRouter = Router()

authRouter.get("/test", authController.test)
//signup
authRouter.post("/sign-up", validation(validators.signUpSchema), authController.signUp)

//confirmEmail
authRouter.get("/confirmEmail/:token", authController.confirmEmail)

//requestNewEmail
authRouter.get("/requestNewEmail/:rFToken", authController.requestNewEmail)

//signIn
authRouter.post("/sign-in", validation(validators.logInSchema), authController.signIn)

//sendCode
authRouter.patch("/sendCode/",validation(validators.sendCode), authController.sendCode)

//forGotPassword
authRouter.patch("/forGotPassword", validation(validators.forGotPassword), authController.forGotPassword)

//logOut
authRouter.post("/log-out", authController.logOut)

export default authRouter