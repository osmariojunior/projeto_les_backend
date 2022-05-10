const httpStatusCodes = require("../../constants/http-status-codes");
const BaseError = require("./base-error");

class ValidationError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    message = "Bad Request."
  ) {
    super(name, statusCode, message);
  }
}

module.exports = ValidationError;
