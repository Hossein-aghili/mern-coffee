import mongoose from "mongoose";
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان اجباری است']
    },
    description: {
        type: String,
        required: [true, 'توضیحات اجباری است']
    },
    images: {
        type: [String],
        default: []
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    author: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)
export default Blog