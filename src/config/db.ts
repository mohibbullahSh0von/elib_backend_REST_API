import mongoose from 'mongoose';
import { config } from './config.js';

const conncectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('The database is connected successfully.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('There is a problem while connecting to the database', err);
    });

    await mongoose.connect(`${config.mongodbURI}/${config.dbName}`);
  } catch (error) {
    console.error('Database connection FAILED!!!', error);

    process.exit(1);
  }
};

export default conncectDB;
