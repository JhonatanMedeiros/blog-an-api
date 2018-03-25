// Importing Node modules and initializing Express
import express from 'express';
import bodyParser from 'body-parser';

import morgan from 'morgan';
import connectToDb from './app/db/connect';
import router from './app/router/router';

import config from './app/config/main';
import logger from './app/config/logger'

const app = express();

connectToDb();

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

// Start the server
const server = app.listen(config.port);
logger.info('server started - ', config.port);

// Application setups
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setting up basic middleware for all Express requests
app.use(morgan('dev', { 'stream': logger.stream })); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Content-Type', 'application/json');
  next();
});

router(app);