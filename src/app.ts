import express, { Application, Request, Response, urlencoded } from 'express';
import cors from 'cors'
const app: Application = express();

app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// testing
app.get('/', (req: Request, res: Response) => {
    res.send('Server is working successfully')
})

export default app 