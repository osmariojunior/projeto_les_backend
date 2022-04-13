const httpStatusCodes = require("../../constants/http-status-codes");
const BaseError = require("./base-error");

class ValidationError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "Bad Request."
  ) {
    super(name, statusCode, description);
  }
}

module.exports = ValidationError;
