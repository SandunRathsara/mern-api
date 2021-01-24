const mongoose = require('mongoose');
const User = require('./User');
const CryptoKey = require('./CryptoKey');
const Role = require('./Role');
const mongodbOptions = require('../config/database.config');
const { error, debug } = require('../log');

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URL, mongodbOptions)
  .then(() => debug('Mongo DB connection established'))
  .catch(reason => error(`Mongo DB connection failed. reason ${reason}`.red));

module.exports = {
  mongoose,
  Role,
  User,
  CryptoKey,
};
