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
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const prosuct = await Product.findById(id).populate('CategoryId')
    if (!prosuct) {
        return next(new HandleERROR('محصول پیدا نشد', 404))
    }
    return res.status(200).json({
        success: true,
        data: prosuct,
        message: 'محصول با موفقیت دریافت شد'
    })
})