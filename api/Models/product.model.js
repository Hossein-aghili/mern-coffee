import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نام محصول اجباری است']
    },
    description: {
        type: String,
        required: [true, 'توضیحات اجباری است']
    },
    images: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: [true, 'قیمت اجباری است']
    }
}, { timestamps: true })
const Product = mongoose.model('Product', productSchema)
export default Product
