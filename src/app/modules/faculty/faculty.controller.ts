import { FacultyServices } from "./faculty.service";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { Faculty } from "./faculty.model";

// Get all faculty
const grtAllFaculties = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await FacultyServices.getAllFacultyFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty are retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

// Get single faculty
const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const faculty = await Faculty.findOneOrThrowError(facultyId as string);
  const result = await FacultyServices.getSingleFacultyFromDB(
    faculty.id as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved successfully!",
    data: result,
  });
});

// Get single update faculty controller
const updateSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty: facultyData } = req.body;
  const result = await FacultyServices.updateSingleFacultyFromDB(
    facultyId,
    facultyData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty updated successfully!",
    data: result,
  });
});

// Delete faculty controller
const deleteFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const faculty = await Faculty.findOneOrThrowError(facultyId as string);
  const result = await FacultyServices.deleteFacultyFromDB(
    faculty.id as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is deleted!",
    data: result,
  });
});

export const FacultyControllers = {
  grtAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteFaculty,
};
