require('winston-daily-rotate-file');
require('winston-mongodb');
const path = require('path');
const appDir = path.dirname(require.main.filename);
require('dotenv').config({ path: `${appDir}/config/.env` });
const mongodbOptions = require('../config/database.config');
const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level.toUpperCase()}] | ${message}`;
  })
);

const databaseFormat = format.combine(format.timestamp(), format.json());

const level = process.env.LOGGER_LEVEL || 'debug';

const logger = createLogger({
  level,
  exitOnError: false,
  transports: [
    new transports.DailyRotateFile({
      frequency: '1d',
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%.log',
      dirname: `${__dirname}/logs`,
      zippedArchive: true,
      format: customFormat,
    }),
    new transports.MongoDB({
      db: process.env.MONGO_URL,
      options: mongodbOptions,
      collection: 'logs',
      format: databaseFormat,
    }),
  ],
});
logger.add(new transports.Console({ format: customFormat }));

module.exports = logger;
