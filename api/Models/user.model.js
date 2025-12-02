import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
    },
    username: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: [true, 'شماره موبایل اجباری است'],
        match: [/^(\+98|0)?9\d{9}$/, "شماره تلفن معتبر نیست"],
        unique: [true, 'شماره تلفن موجود است']
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true })
const User = mongoose.model('User', userSchema)
export default User