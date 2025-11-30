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
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const slider = await Slider.findById(id)
    if (!slider) {
        return next(new HandleERROR('اسلایدر پیدا نشد',404))
    }
    return res.status(201).json({
        success: true,
        data: slider,
        message: 'اسلایدر با موفقیت دریافت شد'
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    let slider = await Slider.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    if (!slider) {
        return next(new HandleERROR('اسلایدر پیدا نشد', 404))
    }
    slider.isActive = !slider.isActive
    await slider.save()
    return res.status(200).json({
        success:true,
        data:slider,
        message:'اسلایدر با موفقیت آپدیت شد'
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const slider = await Slider.findByIdAndDelete(id)
    return res.status(200).json({
        success:true,
        data:slider,
        message:'اسلایدر با موفقیت آپدیت شد'
    })
})
