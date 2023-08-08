import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodValidation),
  UserController.createUserToDb
)
// router.post('/create-user',UserController.createUserToDb)

export const UserRoutes = router
