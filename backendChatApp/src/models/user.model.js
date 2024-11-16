import mongoose from "mongoose";
//@ts-ignore
import bcript from 'bcrypt'
//@ts-ignore
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobileNo: {
        type: String || Number,
    },

    password: {
        type: String,
        required: true
    },

    courses:[{type:mongoose.Schema.Types.ObjectId, ref:"Course"}],

    refreshToken:{
        type:String,
    }


}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password =await bcript.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcript.compare(password, this.password)
}
userSchema.methods.generateAccessToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
    )
}
userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        },
    )
}


export const User = mongoose.model("User", userSchema)