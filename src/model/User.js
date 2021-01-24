const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const SALT_WORK_FACTOR = 10;
const { BusinessLogicFailureException } = require('../util/error');

const userSchema = new Schema(
  {
    fname: {
      type: Schema.Types.String,
    },
    lname: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
      index: true,
      unique: true,
    },
    mobile: {
      type: Schema.Types.String,
      default: null,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    jwtTokens: {
      type: [String],
      select: false,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        autopopulate: true,
      },
    ],
    active: {
      type: Schema.Types.Boolean,
      default: true,
    },
    failedAttempts: {
      type: Schema.Types.Number,
      default: 0,
    },
    locked: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: { currentTime: () => moment().format() } }
);

userSchema.plugin(require('mongoose-autopopulate'));

userSchema.index({ email: 1, roles: 1, department: 1, filters: 1 });

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BusinessLogicFailureException('Duplicate email or mobile error'));
  } else if (error) next(error);
  else next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
  const { _id } = this;
  return jwt.sign(
    {
      _id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRY_TIME }
  );
};

module.exports = mongoose.model('User', userSchema);
