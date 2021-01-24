const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const moment = require('moment-timezone');

const CryptoSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User', required: false, default: null },
    publicKey: { type: String, required: true },
    secretKey: { type: String, required: true },
  },
  { timestamps: { currentTime: () => moment().format() } }
);

CryptoSchema.index({ userId: 1 });

module.exports = mongoose.model('CryptoKey', CryptoSchema);
