import Product from "../Models/product.model.js";
import { catchAsync, HandleERROR } from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body)
    return res.status(200).json({
        success: true,
        data: product,
        message: 'محصول با موفقیت ساخته شد'
    })
})