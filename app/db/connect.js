'use strict';
import Mongoose from 'mongoose';
import logger from '../config/logger'
import config from '../config/main';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  let dbHost = config.db.HOST;
  let dbPort = config.db.PORT;
  let dbName = config.db.DATABASE;
  let dbUser = config.db.USER;
  let dbPassword = config.db.PASS;
  try {
    await Mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, {useMongoClient: true});
    logger.info('Connected to mongo!!!');
  }
  catch (err) {
    logger.error('Could not connect to MongoDB');
  }
};

export default connectToDb;