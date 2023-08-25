import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

// get single faculty
router.get('/:id', FacultyController.getSingleFaculty);

// get all faculty
router.get('/', FacultyController.getAllFaculty);

// delete faculty
router.delete('/:id', FacultyController.deleteFaculty);

// update faculty
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

export const FacultyRoutes = router;
