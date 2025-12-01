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
        success:true,
        data:blogs,
        count
    })
})