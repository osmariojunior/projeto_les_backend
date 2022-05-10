const httpStatusCodes = require("../constants/http-status-codes");
const BaseError = require("./base-error");

class NotFoundError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found."
  ) {
    super(name, statusCode, description);
  }
}

module.exports = NotFoundError;
