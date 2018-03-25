'use strict';

import path from 'path';

let config = {
  // Secret key for JWT signing and encryption
  'secret': process.env.secretPass ||'secretPassDifSecret&',
  // Log
  'logFileDir': path.join(__dirname, '../../.log'),
  'logFileName': 'app.log',
  // Database connection information
  'db': {
    'USER': process.env.dbUser || 'test',
    'PASS': process.env.dbPass || '123456',
    'HOST': process.env.dbHost || 'localhost',
    'PORT': process.env.dbPort || '27017',
    'DATABASE': process.env.dbName || 'blog'
  },
  // Setting port for server
  'port': process.env.PORT || 5000
};

export default config;