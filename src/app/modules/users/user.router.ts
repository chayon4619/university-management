import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/create-user', UserController.createUserToDb)

export const UserRoutes = router
