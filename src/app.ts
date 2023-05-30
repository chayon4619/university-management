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

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Server is working successfully')
})

export default app
