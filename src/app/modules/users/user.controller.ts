import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUserToDb: RequestHandler = async (req, res, next) => {
  const { user } = req.body
  try {
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUserToDb,
}
