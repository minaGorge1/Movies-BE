import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

export const signUpSchema = joi.object({
    userName: joi.string().max(20).required().alphanum(),
    age: joi.number().required().min(16).max(80),
    email: generalFields.email,
    password: generalFields.password,
    cPassword: generalFields.cPassword.valid(joi.ref('password'))
}).required()



export const logInSchema = joi.object({
    email: generalFields.email,
    password: generalFields.password
}).required()

export const sendCode = joi.object({
    email: generalFields.email
}).required()


export const forGotPassword = joi.object({
    email: generalFields.email,
    password: generalFields.password.required(),
    cPassword: generalFields.cPassword.valid(joi.ref("password")),
    code: joi.string().pattern(new RegExp(/^\d{4}$/)).required()
}).required()
