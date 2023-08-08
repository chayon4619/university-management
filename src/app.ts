import express, { Application, urlencoded } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Application Router

app.use('/api/v1/users/', UserRoutes)
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)

// // testing
// app.get('/',  async(req: Request, res: Response,next: NextFunction) => {
//  throw new Error("Testing error")
// })

// global error handler
app.use(globalErrorHandler)

export default app
