import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User student create successfully!",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
