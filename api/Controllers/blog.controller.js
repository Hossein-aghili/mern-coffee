import Blog from "../Models/blog.model.js";
import { catchAsync, HandleERROR } from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
    const blog = await Blog.create(req.body)
    return res.status(200).json({
        success:true,
        data:blog,
        message:'وبلاگ با موفقیت ساخته شد'
    })
})