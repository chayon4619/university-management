import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

// here should be only logic
const createUser = async (user: IUser): Promise<IUser | null> => {
  // we need auto generated incremental id
  const id = await generateUserId()
  user.id = id

  // we need default student password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = User.create(user)

  if (!createdUser) {
    throw new Error('Failed To Create User')
  }

  return createdUser
}

export default {
  createUser,
}
