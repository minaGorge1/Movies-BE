/* import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { compare, hash } from "../../../utils/hashAndCompare.js";
import cloudinary from "../../../utils/cloudinary.js"



export const test = (req, res, next) => {
    return res.json({ message: "hi" })
}

//update user
export const updateUser = asyncHandler(async (req, res, next) => {
    const { userName, phone } = req.body
    const user = await userModel.findByIdAndUpdate(req.user._id, { userName, phone  }, { new: true })
    return res.json({ message: "Done", user });
})

//delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.user._id)
    return res.json({ message: "Done", user });
})

//soft deleteUser user
export const softDeleteUser = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.user._id, { softDelete: true })
    return res.json({ message: "Done", user });
})

//get profile of user
export const userProfile = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user._id)
    return user ? res.json({ message: "Done", user })
        : next(new Error("Not found account"))
})

//update pass
export const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, cPassword, newPassword } = req.body
    const user = await userModel.findById(req.user._id)

    const match = compare({ plaintext: oldPassword, hashValue: user.password })
    if (!match) {
        return next(new Error("In-valid oldPassword", { cause: 400 }))
    }
    const hashPassword = hash({ plaintext: newPassword })
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ message: "Done" })
})




//userPirPic
export const userPirPic = asyncHandler(async (req, res, next) => {

    if (!req.file) {
        return next(new Error("Image is requird", { cause: 409 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `user/${req.user._id}/pic` })
    const user = await userModel.findByIdAndUpdate(req.user._id, { profilePic: { secure_url, public_id } }, { new: false })
    await cloudinary.uploader.destroy(user.profilePic.public_id)
    return res.status(201).json({ message: "Done", user})
}) 

//userCoverPiC
export const userCoverPiC = asyncHandler(async (req, res, next) => {

    if (!req.files?.length) {
        return next(new Error("Image is requird", { cause: 409 }))
    }
    const coverPic = []
    for (const file of req.files) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: `user/${req.user._id}/cover` })
        coverPic.push({ secure_url, public_id })
    }
    const user = await userModel.findByIdAndUpdate(req.user._id, {coverPic}, { new: true })
    return res.status(201).json({ message: "Done", user })
})  */