import mongoose from 'mongoose';
import ApiError from '../../../Errors/ApiErrors';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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

// here should be only logic
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // we need default faculty password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set up role
  user.role = 'faculty';

  // get new data
  let newUserAllData = null;

  // transaction and rollback
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // generate id
    const id = await generateFacultyId();

    // set id
    user.id = id;
    faculty.id = id;

    // create faculty
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }

    // get faculty _id to set user.faculty
    user.faculty = newFaculty[0]._id;

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

  // send newAllData by populating
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
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

// here should be only logic
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // we need default faculty password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set up role
  user.role = 'admin';

  // get new data
  let newUserAllData = null;

  // transaction and rollback
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // generate id
    const id = await generateAdminId();

    // set id
    user.id = id;
    admin.id = id;

    // create admin
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    // get admin _id to set user.admin
    user.admin = newAdmin[0]._id;

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

  // send newAllData by populating
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
