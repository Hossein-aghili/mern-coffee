import User from "../Models/user.model.js";
import ApiFeatures, { catchAsync } from "vanta-api";

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