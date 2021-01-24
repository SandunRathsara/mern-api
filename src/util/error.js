const logger = require('../log');

// eslint-disable-next-line no-unused-vars
// noinspection JSUnusedLocalSymbols
const globalErrorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(err.statusCode).send(err);
};

class Exception extends Error {
  constructor(message, statusCode, status, data = {}) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
    this.data = data;
  }
}

class BusinessLogicFailureException extends Exception {
  constructor(message, data) {
    super(message, 210, 'BusinessLogicFailure', data);
  }
}

class BadRequestException extends Exception {
  constructor(message, data) {
    super(message, 400, 'BadRequest', data);
  }
}

class UnauthorizedException extends Exception {
  constructor(message, data) {
    super(message, 401, 'Unauthorized', data);
  }
}

class ForbiddenException extends Exception {
  constructor(message, data) {
    super(message, 403, 'Forbidden', data);
  }
}

class NotFoundException extends Exception {
  constructor(message, data) {
    super(message, 404, 'NotFound', data);
  }
}

class InternalServerErrorException extends Exception {
  constructor(message, data) {
    super(message, 500, 'InternalServerError', data);
  }
}

class ExternalServerErrorException extends Exception {
  constructor(message, data) {
    super(message, 503, 'ExternalServerError', data);
  }
}

class DatabaseException extends Exception {
  constructor(message, data) {
    super(message, 700, 'DatabaseError', data);
  }
}

module.exports = {
  globalErrorHandler,
  BusinessLogicFailureException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
  ExternalServerErrorException,
  DatabaseException,
  Exception,
};
