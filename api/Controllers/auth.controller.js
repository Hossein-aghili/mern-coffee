import User from "../Models/user.model.js";
import { catchAsync, HandleERROR } from "vanta-api";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendAuthCode, verifyCode } from "../Utils/smsHandler.js";
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
        return next(new HandleERROR('کد وارد شده نادرست است', 400))
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
export const forgetPassword = catchAsync(async (req, res, next) => {
    const { phoneNumber = null, code = null, password = null } = req.body
    if (!phoneNumber || !code || !password) {
        return next(new HandleERROR("اطلاعات وارد شده معتبر نیست", 400))
    }
    const verifyCode = await verifyCode({ phoneNumber })
    if (!verifyCode.success) {
        return next(new HandleERROR('کد وارد شده نادرست است', 400))
    }
    const regexPass = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    if (!regexPass.test(password)) {
        return next(new HandleERROR("رمز عبور باید حداقل 8 کاراکتر و شامل حروف بزرگ و کوچک و اعداد باشد", 400))
    }
    const hashPassword = bcryptjs.hashSync(password, 10)
    const user = await User.findOneAndUpdate({ phoneNumber }, { password: hashPassword })
    if (!user) {
        return next(new HandleERROR("کاربری با این شماره تلفن همراه یافت نشد", 404))
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
        message: "رمز عبور با موفقیت تغییر کرد"
    })
})
export const resendCode = catchAsync(async (req, res, next) => {
    const { phoneNumber = null } = req.body
    if (!phoneNumber) {
        return next(new HandleERROR('شماره تلفن اجباری است'))
    }
    const resultSms = await sendAuthCode(phoneNumber)
    return res.status(200).json({
        success: resultSms.success,
        message: resultSms.success ? "code sent" : resultSms?.message,
    });
})
export const adminLogin = catchAsync(async (req, res, next) => {
    const { phoneNumber = null, password = null } = req.body
    if (!phoneNumber || !password) {
        return next(new HandleERROR('شماره تلفن و رمزعبور اجباری است'))
    }
    const user = await User.findOne({ phoneNumber })
    if (!user) {
        return next(new HandleERROR("کاربری با این شماره تلفن همراه یافت نشد", 404))
    }
    if (user.role != 'admin') {
        return next(new HandleERROR('شما مجوز ندارید', 401))
    }
    const validPassword = bcryptjs.compareSync(password, user?.password)
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
