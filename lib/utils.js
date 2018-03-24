var utils = {};

utils = {
  connectToDatabase: function (mongoose, config, cb) {
    var dbPath;

    dbPath = "mongodb://" + config.USER + ":";
    dbPath += config.PASS + "@";
    dbPath += config.HOST + ((config.PORT.length > 0) ? ":" : "");
    dbPath += config.PORT + "/";
    dbPath += config.DATABASE;
    return mongoose.connect(dbPath, { useMongoClient: true }, cb);
  },
  mongoStoreConnectionArgs:function (config, cb) {
    return {
      db: config.DATABASE,
      host: config.HOST,
      port: config.PORT,
      username: config.USER,
      password: config.PASS };
  },
  dbConnectionUrl: function (config, cb) {
    var dbPath;

    dbPath = "mongodb://" + config.USER + ":";
    dbPath += config.PASS + "@";
    dbPath += config.HOST + ":";
    dbPath += config.PORT + "/";
    dbPath += config.DATABASE;

    return dbPath;
  }
};
module.exports = utils;