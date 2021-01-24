const _ = require('lodash');

class ApiResponse {
  constructor(data, message = '', status = 'OK', statusCode = 200) {
    this.data = data;
    this.status = status;
    this.statusCode = statusCode;

    if (_.isArray(data) && !data.length && !message) {
      this.message = 'No records found';
    } else {
      this.message = message;
    }
  }
}

class CreatedResponse extends ApiResponse {
  constructor(data) {
    super(data, '', 'Created', 201);
  }
}

module.exports = {
  ApiResponse,
  CreatedResponse,
};
