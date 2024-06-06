import mongoose from "mongoose";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { User } from "../user/user.model";
import { AppError } from "../../middlewares/appError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchingFields } from "./admin.constant";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const filterQuery = new QueryBuilder(Admin.find(), query)
    .search(searchingFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await filterQuery.modelQuery;

  return result;
};

// Get single admin service
const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

// update single admin service
const updateSingleAdminFromDB = async (
  id: string,
  payload: Partial<IAdmin>,
) => {
  const { name, ...restAdminData } = payload;
  const modifiedAdminData: Record<string, unknown> = { ...restAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedAdminData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate(
    {
      id,
    },
    modifiedAdminData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// delete admin service
const deleteAdminFromDB = async (id: string) => {
  console.log(id);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const adminDelete = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!adminDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, "Admin delete method failed");
    }

    const userDelete = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!userDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, "User delete method failed");
    }

    await session.commitTransaction();
    await session.endSession();

    return adminDelete;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "This data already deleted");
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateSingleAdminFromDB,
  deleteAdminFromDB,
};
