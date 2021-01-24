const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const roleSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
    },
    code: {
      type: Schema.Types.String,
    },
    approvalLimit: {
      type: Schema.Types.Number,
      default: 0,
    },
    payDDGroupName: {
      type: Schema.Types.String,
    },
    payDDGroupIds: {
      type: [Schema.Types.String],
    },
  },
  { timestamps: { currentTime: () => moment().format() } }
);

roleSchema.index({ approvalLimit: 1 });

module.exports = mongoose.model('Role', roleSchema);
