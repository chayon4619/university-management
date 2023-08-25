import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ManagementDepartmentService } from './managementDepartment.service';
import { IManagementDepartment } from './managementDepartment.interface';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { paginationFields } from '../../../constants/pagination';

// create management
const createManagementToDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicManagementData } = req.body;

  const result = await ManagementDepartmentService.createManagement(
    academicManagementData
  );

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Management is created successfully',
    data: result,
  });
});

// get single management
const getSingleManagement = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await ManagementDepartmentService.getSingleManagement(id);

  // send response
  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management get successfully',
    data: result,
  });
});

// delete management
const deleteManagement = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await ManagementDepartmentService.deleteManagement(id);

  // send response
  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Deleted successfully',
    data: result,
  });
});

// update management
const updateManagement = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // get data from body
  const updatedData = req.body;

  // send id and data in service
  const result = await ManagementDepartmentService.updateManagement(
    id,
    updatedData
  );

  // send response
  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management data Updated successfully',
    data: result,
  });
});

// get all management
const getAllManagement = catchAsync(async (req: Request, res: Response) => {
  // filter and search
  const filters = pick(req.query, managementDepartmentFilterableFields);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // get data from db
  const result = await ManagementDepartmentService.getAllManagement(
    filters,
    paginationOptions
  );

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Management get successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const ManagementDepartmentController = {
  createManagementToDb,
  getSingleManagement,
  deleteManagement,
  updateManagement,
  getAllManagement,
};
