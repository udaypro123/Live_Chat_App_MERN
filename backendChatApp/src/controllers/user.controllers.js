import {User} from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"; 
import { asyncHandler } from "../utils/asyncHandler.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"


const generateAcceesTokenAndRefreshToken = async (userId) => {
    try {

        let user = await User.findById(userId)
        let accessToken = user.generateAccessToken()
        let refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;

        user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "somwthng went wrong while generating AccessTokena and RefreshToken")
    }



}


export const registerUser = asyncHandler(async (req, res) => {
    // take user details 
    // check user already exits or not
    // check required field provided or not
    // if there is image or avatar then check its also then upload on cloudary and take url if image aor avatar is provided but not uploaded on  cloudinary dur eto some issue so please thorw error
    // remove sensitive field like password and refresh token 
    // after all this task register user

    console.log("req-->", req.body)
    const {  email, fullname, password } = req.body

    if ([ email, fullname, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All field are required")
    }

    let ExistingUser = await User.findOne({ email})

    if (ExistingUser) {
        throw new ApiError(409, "user already exists")
    }

    let user = await User.create({
        fullname,
        email,
        password,
    })

    let createdUser = await User.findById(user._id).select("-password -refreshToken")


    if (!createdUser) {
        throw new ApiError(500, "somthinng went wrong, while registering a user")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "user created successfully"))

})


export const logginUser = asyncHandler(async (req, res) => {
    // take user data from user  
    // check username or email
    // find user 
    // check passowrd
    // refresh token and accesstoken genration setup
    // send cockie

    console.log("req-->", req.body)
    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All field are required")
    }

    let user = await User.findOne({email})

    if (!user) {
        throw new ApiError(409, "user does not exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "password is incorrect")
    }

    const { refreshToken, accessToken } = await generateAcceesTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "None", 
    }
    
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

export const logoutUser = asyncHandler(async (req, res) => {

    console.log("----> ", req.user)
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        })

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "None", 
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))

})

export const refreshAccessToken = asyncHandler(async (req, res) => {

    let incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unautorized token")
    }

    try {
        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET)

        if (!decodedToken) {
            throw new ApiError(401, "Invalid Incoming RefreshToken")
        }

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid Incoming RefreshToken")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token expired or used ")
        }

        const options = {
            httpOnly: true,
            secure: true,
        }

        const { accessToken, newrefreshToken } = await generateAcceesTokenAndRefreshToken(user?._id)

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newrefreshToken }, "Refresh token refreshed "))

    } catch (error) {
        throw new ApiError(401, error?.message || "invalid incoming Refresh Token ")
    }
})


export const changeCurrentPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req?.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "invalid Old Password")
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "password changed successfully"))

})


export const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "user fetch successfully"))

})


export const updateAccountDetails = asyncHandler(async (req, res) => {

    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(401, "All filed are Required")
    }

    const user = await User.findByIdAndUpdate(req.user?._id, {

        $set: {
            fullName,
            email
        }

    }, { new: true }).select("-password")


    return res
        .status(200)
        .json(new ApiResponse(200, user, "user update successfully"))

})


export const getUser = asyncHandler(async (req, res) => {
    
    const user = await User.find()
    return res
        .status(200)
        .json(new ApiResponse(200, user, "user update successfully"))

})


