import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

// create student
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodValidation),
  UserController.createStudentToDb
);

// create faculty
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodValidation),
  UserController.createFacultyToDb
);

// create admin
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdminToDb
);

export const UserRoutes = router;
