import User from "../Models/user.model.js";
import { catchAsync, HandleERROR } from "vanta-api";

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