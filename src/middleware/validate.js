const { param, validationResult } = require('express-validator');
const { BusinessLogicFailureException } = require('../util/error');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(error => extractedErrors.push({ [error.param]: error.msg }));
  const exception = new BusinessLogicFailureException('Validation failed', extractedErrors);
  next(exception);
};

const idParamValidator = [
  param('id').notEmpty().withMessage('ID is required'),
  param('id').isMongoId().withMessage('ID should be a mongo ID'),
];

const fileValidator = (req, res, next) => {
  if (!req.file) {
    next(new BusinessLogicFailureException('file is required'));
  }
  next();
};

const ValidateEmail = mail => {
  try {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
  } catch (e) {
    return false;
  }
};

module.exports = {
  validate,
  idParamValidator,
  fileValidator,
  ValidateEmail,
};
