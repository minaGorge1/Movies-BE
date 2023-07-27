import userModel from "../../DB/model/User.model.js";
import { verifyToken } from "../utils/generateAndVerifyToken.js";

/* authorization */
export const auth = async (req, res, next) => {
    try {

        const { authorization } = req.headers
        if (!authorization?.startsWith(process.env.TOKENSTARTSWITH)) {
            return next(new Error("In-valid authorization"))
        }
        const token = authorization.split(process.env.TOKENSTARTSWITH)[1]
        if (!token) {
            return next(new Error("token is required"))
        }
        const decoded = verifyToken({ token: token })
        if (!decoded.id || !decoded.userName || !decoded.email) {
            return next(new Error("In-valid payload"))
        }
        //redirect
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return next(new Error("not retested account"))
        }
        if (user.softDelete) {
            //res.redirect("http://localhost:5000/auth/sign_in")
            return next(new Error("account is deleted"))
        }
        if (user.status == "offline") {
            //res.redirect("http://localhost:5000/auth/sign_in")
            return next(new Error("account is offline"))
        }

        req.user = user
        return next()
    } catch (error) {
        if (error.message.startsWith("jwt")) {
            return res.json({ message: error.message })
        }
        return res.json({ message: "catch error", error })
    }
}