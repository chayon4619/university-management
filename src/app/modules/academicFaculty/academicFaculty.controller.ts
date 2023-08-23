import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

// create faculty
const createFacultyToDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;

  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

// get single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await AcademicFacultyService.getSingleFaculty(id);

  // send response
  sendResponse<IAcademicFaculty>(res, {
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
  const result = await AcademicFacultyService.deleteFaculty(id);

  // send response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty Deleted successfully',
    data: result,
  });
});

// update faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // get data from body
  const updatedData = req.body;

  // send id and data in service
  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  // send response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty data Updated successfully',
    data: result,
  });
});

// get all faculty
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  // filter and search
  const filters = pick(req.query, academicFacultyFilterableFields);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // get data from db
  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty get successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicFacultyController = {
  createFacultyToDb,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
  getAllFaculty,
};
