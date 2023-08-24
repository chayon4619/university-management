/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { studentSearchableFields } from './student.constant';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import ApiError from '../../../Errors/ApiErrors';
import httpStatus from 'http-status';

// get single student
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// delete student
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// update student
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  // find user
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  // get all data from student object
  const { name, guardian, localGuardian, ...studentData } = payload;

  // copy student data
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // dynamically handle update name,guardian,localGuardian
  // for name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // for guardian
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
      // updatedStudentData['guardian.motherContactNo']=guardian[motherContactNo]
      // updatedStudentData --> object create --> guardian : { motherContactNo: 0177}
    });
  }

  // for local guardian
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  // send updatedData
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

// get all student
const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  // searching
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // searching condition
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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
  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // total document
  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const StudentService = {
  getSingleStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
};
