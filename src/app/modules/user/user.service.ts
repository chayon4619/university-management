import mongoose from 'mongoose';
import ApiError from '../../../Errors/ApiErrors';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

// here should be only logic
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // we need default student password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set up role
  user.role = 'student';

  // get academic semester id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // get new data
  let newUserAllData = null;

  // transaction and rollback
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // generate id
    const id = await generateStudentId(academicSemester);

    // set id
    user.id = id;
    student.id = id;

    // create student
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    // get student _id to set user.student
    user.student = newStudent[0]._id;

    // create user
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    // access new user
    newUserAllData = newUser[0];

    // commit transaction
    await session.commitTransaction();

    // end session
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student ---> academicSemester, academicDepartment , academicFaculty
  // send newAllData by populating
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
