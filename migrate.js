require('./src/config');

module.exports = {
  dbConnectionUri: process.env.MONGO_URL,
  autosync: true,
};
