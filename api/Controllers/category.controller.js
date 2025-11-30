import Category from "../Models/category.model.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
export const create = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body)
    return res.status(200).json({
        success: true,
        data: category,
        message: 'دسته بندی با موفقیت ساخته شد'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Category, req.query, req.role)
        .filter()
        .sort()
        .populate()
        .paginate()
        .limitFields()
    const categories = await features.execute()
    const count = await Category.countDocuments()
    return res.status(200).json({
        success: true,
        data: categories,
        count
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findById(id)
    if (!category) {
        return next(new HandleERROR('دسته بندی پیدا نشد', 404))
    }
    return res.status(200).json({
        success: true,
        data: category,
        message: 'دسته بندی با موفقیت دریافت شد'
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    if (!category) {
        return next(new HandleERROR('دسته بندی پیدا نشد', 404))
    }
    return res.status(200).json({
        success: true,
        data: category,
        message: 'دسته بندی با موفقیت آپدیت شد'
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(id)
    return res.status(200).json({
        success: true,
        data: category,
        message: 'دسته بندی با موفقیت حذف شد'
    })
})