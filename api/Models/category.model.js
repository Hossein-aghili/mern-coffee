import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان اجباری است']
    },
    images: {
        type: [String],
        default:[]
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)
export default Category