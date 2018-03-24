module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'secretPassDifSecret&',
  // Database connection information
  'db': {
    'USER': process.env.DBUSER || 'test',
    'PASS': process.env.DBPASS || '123456',
    'HOST': process.env.DBHOST || 'localhost',
    'PORT': process.env.DBPORT || '27017',
    'DATABASE': process.env.DBBASE || 'blog'
  },
  // Setting port for server
  'port': process.env.PORT || 5000
};