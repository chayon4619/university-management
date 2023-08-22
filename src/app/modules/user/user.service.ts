import ApiError from '../../../Errors/ApiErrors';
import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

// here should be only logic
const createUser = async (user: IUser): Promise<IUser | null> => {
  // we need auto generated incremental id
  const id = await generateUserId();
  user.id = id;

  // we need default student password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed To Create User');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};
