import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database Connect Successfully')

    app.listen(config.port, () => {
      console.log(`Application is running on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to Connect ', error)
  }
}
dbConnect()
