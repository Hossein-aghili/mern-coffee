import Slider from "../Models/slider.model.js";
import { HandleERROR } from "vanta-api";
import catchAsync from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
    const slider = await Slider.create(req.body)
    return res.status(200).json({
        success: true,
        data: slider,
        message: 'اسلایدر با موفقیت ساخته شد'
    })
})