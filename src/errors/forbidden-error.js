const httpStatusCodes = require("../constants/http-status-codes");
const BaseError = require("./base-error");

class ForbiddenError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.FORBIDDEN,
    description = "Not authorized."
  ) {
    super(name, statusCode, description);
  }
}

module.exports = ForbiddenError;
