import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

// create management
const createManagement = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

// get single management
const getSingleManagement = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

// delete management
const deleteManagement = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id });
  return result;
};

// update management
const updateManagement = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

//get all management
const getAllManagement = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  // searching
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // searching condition
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentFilterableFields.map(field => ({
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
  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // total document
  const total = await ManagementDepartment.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ManagementDepartmentService = {
  createManagement,
  getSingleManagement,
  deleteManagement,
  updateManagement,
  getAllManagement,
};
