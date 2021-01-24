const path = require('path');
const dotenv = require('dotenv');
const logger = require('../log');

const envFilePath = path.resolve(__dirname, '.env');
const config = dotenv.config({ path: envFilePath });
if (config.error) {
  logger.warn('could not find configurations from local file. Please make sure to passed them as env vars');
} else {
  logger.info(`loaded configs from .env file => ${JSON.stringify(config.parsed, null, '\t')}`);
}

const ENVs = ['API_ENV', 'SERVER_PORT', 'SERVER_NAME', 'DASHBOARD_URL', 'MONGO_URL', 'JWT_SECRET', 'TOKEN_EXPIRY_TIME'];

ENVs.forEach(env => {
  if (!process.env[env]) {
    throw new Error(`${env} is required in configs`);
  }
});
