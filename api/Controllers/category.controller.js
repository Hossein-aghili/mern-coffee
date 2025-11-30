import Category from "../Models/category.model.js";
import { catchAsync, HandleERROR } from "vanta-api";
export const create = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body)
    return res.status(200).json({
        success: true,
        data: category,
        message: 'دسته بندی با موفقیت ساخته شد'
    })
})