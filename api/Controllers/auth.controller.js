import User from "../Models/user.model.js";
import { catchAsync, HandleERROR } from "vanta-api";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
export const auth = catchAsync(async (req, res, next) => {
    const { phoneNumber = null } = req.body
    if (!phoneNumber) {
        return next(new HandleERROR('شماره تلفن خود را وارد کنید', 403))
    }
    const user = await User.findOne({ phoneNumber })
    if (user && user.password) {
        return res.status(200).json({
            success: true,
            newAccount: false,
            password: true
        })
    } else {
        const resultSms = await sendAuthCode({ phoneNumber })
        if (resultSms.success) {
            return res.status(200).json({
                success: true,
                newAccount: user?._id ? false : true,
                password: false
            })
        } else {
            return res.status(404).json({
                success: false,
                newAccount: user?._id ? false : true,
                password: false,
                message: resultSms.message
            })
        }
    }
})
export const checkOtp = catchAsync(async (req, res, next) => {
    const { phoneNumber = null, code = null, newAccount = 'unknown' } = req.body
    if (!phoneNumber || !code || newAccount === 'unknown') {
        return next(new HandleERROR('اطلاعات وارد شده اجباری است', 400))
    }
    const verifyCode = await verifyCode(phoneNumber, code)
    if (!verifyCode.success) {
        return next(new HandleERROR('کد وارد شده نادرست است'))
    }
    let user
    if (newAccount === 'true') {
        user = await User.create({ phoneNumber })
    } else {
        user = await User.findOne({ phoneNumber })
    }

    const token = jwt.sign({
        id: user._id,
        phoneNumber: user.phoneNumber,
        role: user.role
    }, process.env.JWT_SECRET)

    return res.status(200).json({
        success: true,
        data: {
            user: {
                phoneNumber,
                id: user._id,
                role: user.role
            },
            token,
        },
        message: "ورود با موفقیت انجام شد"
    })
})
export const checkPassword = catchAsync(async (req, res, next) => {
    const { phoneNumber = null, password = null } = req.body
    if (!phoneNumber || !password) {
        return next(new HandleERROR('شماره تلفن و رمزعبور اجباری است'))
    }
    const user = await User.findOne({ phoneNumber })
    if (!user) {
        return next(new HandleERROR('کاربر یافت نشد'))
    }
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
        return next(new HandleERROR('رمز عبور نادرست است', 400))
    }
    const token = jwt.sign({
        id: user._id,
        phoneNumber: user.phoneNumber,
        role: user.role
    }, process.env.JWT_SECRET)

    return res.status(200).json({
        success: true,
        data: {
            user: {
                phoneNumber,
                id: user._id,
                role: user.role
            },
            token,
        },
        message: "ورود با موفقیت انجام شد"
    })

})