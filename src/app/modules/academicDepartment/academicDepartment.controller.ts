import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { paginationFields } from '../../../constants/pagination';

// create department
const createDepartmentToDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;

  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  });
});

// get single department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  // send response
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department get successfully',
    data: result,
  });
});

// delete department
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await AcademicDepartmentService.deleteDepartment(id);

  // send response
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Deleted successfully',
    data: result,
  });
});

// update department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // get data from body
  const updatedData = req.body;

  // send id and data in service
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  // send response
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data Updated successfully',
    data: result,
  });
});

// get all department
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  // filter and search
  const filters = pick(req.query, academicDepartmentFilterableFields);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // get data from db
  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Department get successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicDepartmentController = {
  createDepartmentToDb,
  getSingleDepartment,
  deleteDepartment,
  updateDepartment,
  getAllDepartment,
};
