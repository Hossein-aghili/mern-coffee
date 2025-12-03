import User from "../Models/user.model.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .filter()
    .sort()
    .populate()
    .paginate()
    .limitFields();
  const users = await features.execute();
  const count = await User.countDocuments();
  return res.status(200).json({
    success: true,
    data: users,
    count,
    message: "با موفقیت دریافت شد",
  });
});
export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.role !== "admin" && req.userId !== id) {
    return next(new HandleERROR("شما اجازه دسترسی به این صفحه را ندارید", 403));
  }
  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(new HandleERROR("کاربر پیدا نشد", 400));
  }
  return res.status(200).json({
    success: true,
    data: user,
    message: "با موفقیت ساخته شد",
  });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.role !== "admin" && req.userId !== id) {
    return next(new HandleERROR("شما اجازه دسترسی به این صفحه را ندارید", 403));
  }
  const { fullName = null, username = null, role = null } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleERROR("کاربر پیدا نشد", 400));
  }
  user.fullName = fullName || user.fullName;
  user.username = username || user.username;
  if (req.role == "admin" && role) {
    user.role = role;
  }
  const newUser = await user.save()
      return res.status(200).json({
        success: true,
        data: newUser,
        message: "با موفقیت آپدیت شد",
      });
});
