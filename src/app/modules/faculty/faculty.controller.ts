import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.service';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { paginationFields } from '../../../constants/pagination';

// get single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await FacultyService.getSingleFaculty(id);

  // send response
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty get successfully',
    data: result,
  });
});

// delete faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await FacultyService.deleteFaculty(id);

  // send response
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

// get all faculty
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  // filter and search
  const filters = pick(req.query, facultyFilterableFields);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // get data from db
  const result = await FacultyService.getAllFaculty(filters, paginationOptions);

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty get successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // get data from body
  const updatedData = req.body;

  // send id and data in service
  const result = await FacultyService.updateFaculty(id, updatedData);

  // send response
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data Updated successfully',
    data: result,
  });
});

export const FacultyController = {
  getSingleFaculty,
  deleteFaculty,
  getAllFaculty,
  updateFaculty,
};
