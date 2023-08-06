import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.router'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Application Router

app.use('/api/v1/users/', userRouter)

// error class
class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Server is working successfully')
  throw new ApiError(400, 'ore baba')
})

export default app
