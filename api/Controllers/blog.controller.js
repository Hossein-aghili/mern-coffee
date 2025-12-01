import Blog from "../Models/blog.model.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
    const blog = await Blog.create(req.body)
    return res.status(200).json({
        success: true,
        data: blog,
        message: 'وبلاگ با موفقیت ساخته شد'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Blog, req.query, req.role)
        .filter()
        .sort()
        .limitFields()
        .populate()
        .paginate()
    const blogs = await features.execute()
    const count = await Blog.countDocuments()
    return res.status(200).json({
        success: true,
        data: blogs,
        count
    })
})

export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (!blog) {
        return next(new HandleERROR('وبلاگ پیدا نشد', 404))
    }
    return res.status(200).json({
        success: true,
        data: blog,
        message: 'وبلاگ با موفقیت دریافت شد'
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    if (!blog) {
        return next(new HandleERROR('وبلاگ پیدا نشد', 404))
    }
    return res.status(200).json({
        success: true,
        data: newBlog,
        message: 'وبلاگ با موفقیت اپدیت شد'
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        data: blog,
        message: 'وبلاگ با موفقیت حذف شد'
    })
})