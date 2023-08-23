import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

// create semester route
router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterZodValidation
  ),
  AcademicSemesterController.createSemesterToDb
);

// get semester route
router.get('/:id', AcademicSemesterController.getSingleSemesters);

//delete semester route
router.delete('/:id', AcademicSemesterController.deleteSemester);

// update semester route
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterZodValidation
  ),
  AcademicSemesterController.updateSemester
);

// get all semester route
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
