import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'

const createSemesterToDb = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    })
    next()
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions={
    //   page:req.query.page,
    //   limit:req.query.limit,
    //   sortBy:req.query.sortBy,
    //   sortOrder:req.query.sortOrder
    //

    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Semester get successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createSemesterToDb,
  getAllSemesters,
}
