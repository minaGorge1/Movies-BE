import mongoose, { Schema, model } from "mongoose";

/* (userName,phone,email,password,cpassword,status) */

const userSchema = new Schema({
    profilePic: Object,
    coverPic: [],
    userName: {
        type: String,
        required: [true, "userName is required"],
        min: [2, "minimum length 2 char"],
        max: [20, "max length 20 char"]
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "userName is required"],
        unique: [true, "email must be unique value"]
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "offline",
        enum: ["offline", "online", "blocked"]
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    softDelete: {
        type: Boolean,
        default: false
    },
    code: {
        type: Number,
        default: null
    }
}, {
    timestamps: true
})

const userModel = mongoose.models.User || model("User", userSchema)
export default userModel