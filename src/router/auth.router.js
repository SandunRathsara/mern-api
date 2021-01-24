const express = require('express');
const { body } = require('express-validator');
const { REGISTER, LOGIN } = require('../constant/route/auth.route.constant');
const { validate } = require('../middleware/validate');
const authController = require('../controller/auth.controller');
const { User } = require('../model');
const { formatMobileNumber } = require('../helpers/general.helper');

const authRouter = express.Router();

// validate existing unique field
function isFieldExistInDB(value) {
  return User.findOne(value).then(user => {
    if (user) return Promise.reject(`${Object.keys(value)[0]} already in use`);
  });
}

// validate mobile format
function isMobileFormat(value) {
  if (!formatMobileNumber(value)) throw new Error(`Mobile should have in proper format`);
  else return true;
}

// validators
const registerValidator = [
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Email should have in proper format'),
  body('email').custom(value => isFieldExistInDB({ email: value })),
  body('mobile').notEmpty().withMessage('Mobile is required'),
  body('mobile').custom(isMobileFormat),
  body('mobile').custom(value => isFieldExistInDB({ mobile: formatMobileNumber(value) })),
  body('fname').notEmpty().withMessage('First name is required'),
  body('lname').notEmpty().withMessage('Last name is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 8 }).withMessage('Password minimum length is 8'),
];
const loginValidator = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// auth routes
authRouter.post(REGISTER, registerValidator, validate, authController.register);
authRouter.post(LOGIN, loginValidator, validate, authController.login);

module.exports = {
  authRouter,
};
