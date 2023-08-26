import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../../../constants/pagination';

// get single admin
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await AdminService.getSingleAdmin(id);

  // send response
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin get successfully',
    data: result,
  });
});

// delete admin
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await AdminService.deleteAdmin(id);

  // send response
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

// get all admin
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  // filter and search
  const filters = pick(req.query, adminFilterableFields);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // get data from db
  const result = await AdminService.getAllAdmin(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admin get successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update admin
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // get data from body
  const updatedData = req.body;

  // send id and data in service
  const result = await AdminService.updateAdmin(id, updatedData);

  // send response
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data Updated successfully',
    data: result,
  });
});

export const AdminController = {
  getSingleAdmin,
  deleteAdmin,
  getAllAdmin,
  updateAdmin,
};
