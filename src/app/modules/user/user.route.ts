import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

// create student
router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodValidation),
  UserController.createStudentToDb
);
// router.post('/create-user',UserController.createUserToDb)

export const UserRoutes = router;
