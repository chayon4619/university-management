import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableField } from './academicSemester.constant';

// create semester
const createSemesterToDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;

  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

// get all semester
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  // filter and search
  const filters = pick(req.query, academicSemesterFilterableField);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // get data from db
  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester get successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single semester
const getSingleSemesters = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await AcademicSemesterService.getSingleSemester(id);

  // send response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Semester get successfully',
    data: result,
  });
});

// update semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // get data from body
  const updatedData = req.body;

  // send id and data in service
  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  // send response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Semester data Updated successfully',
    data: result,
  });
});

// delete semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await AcademicSemesterService.deleteSemester(id);

  // send response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Semester deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemesterToDb,
  getAllSemesters,
  getSingleSemesters,
  updateSemester,
  deleteSemester,
};
