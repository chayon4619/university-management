import express from 'express'
// import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterZodValidation
  ),
  AcademicSemesterController.createSemesterToDb
)

export const AcademicSemesterRoutes = router
