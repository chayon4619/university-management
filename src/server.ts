import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database Connect Successfully')

    app.listen(config.port, () => {
      logger.info(`Application is running on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to Connect ', error)
  }
}
dbConnect()
