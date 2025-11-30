import mongoose from "mongoose";

const sliderSchema = mongoose.Schema({
    name: {
        type: String
    },
    images: {
        type: [String],
        required: [true, 'image is required'],
        default:[]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Slider = mongoose.model('Slider', sliderSchema)
export default Slider