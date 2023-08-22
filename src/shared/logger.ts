import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UN-Auth' }),
    timestamp(),
    myFormat
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      level: 'info',
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'UNM-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'UN-Auth' }),
    timestamp(),
    myFormat
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      level: 'info',
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UNM-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };
