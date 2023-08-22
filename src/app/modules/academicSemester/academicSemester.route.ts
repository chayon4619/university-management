import express from 'express';
// import { UserController } from './user.controller'
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

router.get('/:id', AcademicSemesterController.getSingleSemesters);

router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterZodValidation
  ),
  AcademicSemesterController.updateSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
