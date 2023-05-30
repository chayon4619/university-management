import { Request, Response } from 'express'
import usersService from './users.service'

const createUserToDb = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create User',
    })
  }
}

export default {
  createUserToDb,
}
