import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createSemesterToDb: RequestHandler = async (req, res, next) => {
  const { ...academicSemesterData } = req.body
  try {
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    res.status(200).json({
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AcademicSemesterController = {
  createSemesterToDb,
}
