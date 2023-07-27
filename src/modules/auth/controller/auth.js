import { customAlphabet } from "nanoid"
import userModel from "../../../../DB/model/User.model.js"
import sendEmail from "../../../utils/email.js"
import { asyncHandler } from "../../../utils/errorHandling.js"
import { createToken, verifyToken } from "../../../utils/generateAndVerifyToken.js"
import { compare, hash } from "../../../utils/hashAndCompare.js"



export const test = asyncHandler((req, res, next) => {
    return res.json({ message: "hi" })
})

/* (userName,age,email,password,cPassword,status) */

//signUp
export const signUp = asyncHandler(async (req, res, next) => {

    const { userName, email, age, password } = req.body
    if (await userModel.findOne({ email })) {
        return next(new Error("Email Exist", { cause: 409 }))
    }


    //confirmEmail
    const token = createToken({ payload: { email }, expiresIn: 60 * 5 })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`

    const rFToken = createToken({ payload: { email }, expiresIn: 60 * 60 * 24 * 30 })
    const rfLink = `${req.protocol}://${req.headers.host}/auth/requestNewEmail/${rFToken}`

    const html = `<a href="${link}">Click me to confirm Email</a> <br> <br> <br>
    <a href="${rfLink}">Request new email</a>`

    if (! await sendEmail({ to: email, subject: "confirm_Email", html })) {
        return next(new Error("Email rejected", { cause: 400 }))
    }

    //hashPassword
    const hashPassword = hash({ plaintext: password, saltRound: parseInt(process.env.SALTROUND) })
    //save
    const user = await userModel.create({ userName, email, age, password: hashPassword })
    return res.status(201).json({ message: "Done", user })
})

// dy al page aly hiro7lha fy al massage al gmail w  front end 3la login
export const confirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    const decoded = verifyToken({ token })
    const user = await userModel.findOneAndUpdate({ email: decoded.email, confirmEmail: false }, { confirmEmail: true })
    if (!user) {
        return next(new Error("In-Valid account", { cause: 404 }))
    }
    return res.status(200).redirect("http://localhost:3000/login")
    /* redirect("")  to link front end */
})

//requestNewEmail
export const requestNewEmail = asyncHandler(async (req, res, next) => {
    const { rFToken } = req.params
    const decoded = verifyToken({ token: rFToken })

    const token = createToken({ payload: { email: decoded.email, confirmEmail: false }, expiresIn: 60 * 2 })
    const link = `http://localhost:5000/auth/confirmEmail/${token}`
    const rfLink = `http://localhost:5000/auth/requestNewEmail/${rFToken}`

    const html = `<a href="${link}">Click me to confirm Email</a> <br> <br> <br>
    <a href="${rfLink}">Request new email</a>`
    if (! await sendEmail({ to: decoded.email, subject: "confirm_Email", html })) {
        return next(new Error("Email rejected", { cause: 400 }))
    }
    const user = await userModel.updateOne({ email: decoded.email }, { confirmEmail: true })
    return user ? res.status(200).json("done please check your email") : ""
})

//signIn
export const signIn = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error(" Email not exist ", { cause: 404 }))
    }
    if (!user.confirmEmail) {
        return next(new Error("please confirm your email", { cause: 400 }))
    }
    const match = compare({ plaintext: password, hashValue: user.password })
    if (!match) {
        return next(new Error("In-Valid password", { cause: 400 }))
    }

    const status = await userModel.findOneAndUpdate(email, { status: "online" }, { new: true })
    const token = createToken({ payload: { id: user._id, userName: user.userName, email: user.email }, expiresIn: 60 * 60 * 24 })
    return res.status(200).json({ message: "Done", token  })
})

//sendCode
export const sendCode = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    // const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    const forgetCode = customAlphabet("123456789", 4)
    const user = await userModel.findOneAndUpdate({ email: email.toLowerCase() }, { code: forgetCode() }, { new: true })
    if (!user) {
        return next(new Error("not found this account", { cause: 404 }))
    }
    const html = `<a>the code is <b>${user.code}</b> </a>`
    //send confirm to gmail
    if (! await sendEmail({ to: email, subject: "Forget Password", html })) {
        return next(new Error("Email rejected", { cause: 400 }))
    }
    return res.status(200).json({message: "Done please check your email"})

})

//forGotPassword
export const forGotPassword = asyncHandler(async (req, res, next) => {
    const { email, code, password } = req.body
    const user = await userModel.findOne({ email: email.toLowerCase() })
    if (!user) {
        return next(new Error("not found this account", { cause: 404 }))
    }
    if (user.code != code) {
        return next(new Error("In-valid code", { cause: 404 }))
    }
    user.password = hash({ plaintext: password })
    user.code = null
    await user.save()
    return res.status(200).json({ message: "Done" })

})

//logOut
export const logOut = asyncHandler(async (req, res, next) => {
    const user = await userModel.findOneAndUpdate( {email: req.body.email}, { status: "offline" })
    return res.status(200).json({ message: "go offline" })
})
