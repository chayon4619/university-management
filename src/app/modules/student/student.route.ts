import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

// get single student
router.get('/:id', StudentController.getSingleStudent);

// get all student
router.get('/', StudentController.getAllStudent);

// delete student
router.delete('/', StudentController.deleteStudent);

// update student
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
