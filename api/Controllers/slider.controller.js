import Slider from "../Models/slider.model.js";
import ApiFeatures, { HandleERROR } from "vanta-api";
import catchAsync from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
    const slider = await Slider.create(req.body)
    return res.status(200).json({
        success: true,
        data: slider,
        message: 'اسلایدر با موفقیت ساخته شد'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = ApiFeatures(Slider, req.query, req.role)
        .filter()
        .sort()
        .populate()
        .paginate()
        .limitFields()
    const sliders = await features.execute()
    const count = await Slider.countDocuments()
    return res.status(200).json({
        success: true,
        data: sliders,
        count
    })
})