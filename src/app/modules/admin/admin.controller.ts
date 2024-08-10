import { AdminServices } from "./admin.service";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { Admin } from "./admin.model";

// Get all admin
const grtAllFaculties = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await AdminServices.getAllAdminFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin are retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

// Get single admin
const getSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const admin = await Admin.findOneOrThrowError(adminId as string);
  const result = await AdminServices.getSingleAdminFromDB(admin.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved successfully!",
    data: result,
  });
});

// Get single update admin controller
const updateSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin: adminData } = req.body;
  const result = await AdminServices.updateSingleAdminFromDB(
    adminId,
    adminData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully!",
    data: result,
  });
});

// Delete admin controller
const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const admin = await Admin.findOneOrThrowError(adminId as string);
  const result = await AdminServices.deleteAdminFromDB(admin.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is deleted!",
    data: result,
  });
});

export const AdminControllers = {
  grtAllFaculties,
  getSingleAdmin,
  updateSingleAdmin,
  deleteAdmin,
};
