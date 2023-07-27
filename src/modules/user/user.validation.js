/* import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const updateUser = joi.object({
    userName:joi.string().max(20).required(),
    phone:joi.string().required(),
})

export const userPirPic= joi.object({
    file:generalFields.file
})

export const userCoverPiC= joi.object({
    file: joi.array().items(generalFields.file.required())
})

export const updatePassword =  joi.object({
        oldPassword: generalFields.password,
        newPassword: generalFields.password.invalid(joi.ref("oldPassword")),
        cPassword: generalFields.cPassword.valid(joi.ref("newPassword"))
    }).required()
 */