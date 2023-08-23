import { z } from 'zod';

const createFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodValidation,
  updateFacultyZodValidation,
};
