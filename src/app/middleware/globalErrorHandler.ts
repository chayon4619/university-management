import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import handelValidationError from '../../Errors/handelValidationError'
import config from '../../config'
import ApiError from '../../Errors/ApiErrors'
import { ZodError } from 'zod'
import handelZodError from '../../Errors/handelZodError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something Went Wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifyError = handelValidationError(err)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorMessages = simplifyError.errorMessages
  } else if (err instanceof ZodError) {
    const simplifyError = handelZodError(err)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorMessages = simplifyError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: ' ',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: ' ',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
