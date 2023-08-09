import express, { Application, urlencoded } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Application Router
app.use('/api/v1', routes)

// // testing
// app.get('/',  async(req: Request, res: Response,next: NextFunction) => {
//  throw new Error("Testing error")
// })

// global error handler
app.use(globalErrorHandler)

export default app
