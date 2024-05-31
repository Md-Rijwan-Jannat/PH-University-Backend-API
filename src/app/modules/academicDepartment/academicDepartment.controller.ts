import { AcademicDepartmentServices } from "./academicDepartment.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartment } from "./academicDepartment.model";

// Create academic department controller
const createAcademicDepartment = catchAsync(async (req, res) => {
  const { academicDepartment: academicDepartmentData } = req.body;
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
      academicDepartmentData,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department created successfully!",
    data: result,
  });
});

// Get all faculties controller
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic departments retrieved successfully!",
    data: result,
  });
});

// Get single department controller
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const department = await AcademicDepartment.findOneOrThrowError(departmentId);

  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      department._id,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department retrieved successfully!",
    data: result,
  });
});

// Get single department controller
const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const { academicDepartment: academicDepartmentData } = req.body;
  const result =
    await AcademicDepartmentServices.updateSingleAcademicDepartmentFromDB(
      departmentId,
      academicDepartmentData,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department updated successfully!",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
