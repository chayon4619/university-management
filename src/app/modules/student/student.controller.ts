import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';
import { IStudent } from './student.interface';
import { Request, Response } from 'express';
import { studentFilterableFields } from './student.constant';

// get single student
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await StudentService.getSingleStudent(id);

  // send response
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student get successfully',
    data: result,
  });
});

// get all student
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  // filter and search
  const filters = pick(req.query, studentFilterableFields);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // get data from db
  const result = await StudentService.getAllStudent(filters, paginationOptions);

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Student get successfully',
    meta: result.meta,
    data: result.data,
  });
});

// // delete student
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // send id in service
  const result = await StudentService.deleteStudent(id);

  // send response
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

// // update student
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  // get the id
  const id = req.params.id;

  // get data from body
  const updatedData = req.body;

  // send id and data in service
  const result = await StudentService.updateStudent(id, updatedData);

  // send response
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data Updated successfully',
    data: result,
  });
});

export const StudentController = {
  getSingleStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
};
