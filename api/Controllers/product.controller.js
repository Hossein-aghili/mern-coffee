import Product from "../Models/product.model.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body)
    return res.status(200).json({
        success: true,
        data: product,
        message: 'محصول با موفقیت ساخته شد'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Product, req.query, req.role)
        .filter()
        .sort()
        .populate()
        .paginate()
        .limitFields()
    const products = await features.execute()
    const count = await Product.countDocuments()
    return res.status(200).json({
        success: true,
        data: products,
        count
    })
})