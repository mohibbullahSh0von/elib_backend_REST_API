import { config as conf } from 'dotenv';

conf();

const _config = {
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_NAME,
  env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
