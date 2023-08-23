import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// create faculty route
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodValidation),
  AcademicFacultyController.createFacultyToDb
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodValidation),
  AcademicFacultyController.updateFaculty
);

router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
