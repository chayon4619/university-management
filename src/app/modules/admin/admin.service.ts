/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../Errors/ApiErrors';
import httpStatus from 'http-status';

// get single admin
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment');
  return result;
};

// delete admin
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete({ _id: id }).populate(
    'managementDepartment'
  );
  return result;
};

// get all admin
const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  // searching
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // searching condition
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filters data conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination,sorting

  // pagination calculation
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  // implement sortBy and sortOrder
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // it's for get data without filtering,searching
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // find the result
  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // total document
  const total = await Admin.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update admin
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  // find user
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  // get all data from faculty object
  const { name, ...adminData } = payload;

  // copy student data
  const updatedFacultyData: Partial<IAdmin> = { ...adminData };

  // dynamically handle update name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // send updatedData
  const result = await Admin.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });
  return result;
};

export const AdminService = {
  getSingleAdmin,
  deleteAdmin,
  getAllAdmin,
  updateAdmin,
};
