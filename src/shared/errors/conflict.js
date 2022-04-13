const httpStatusCodes = require("../../constants/http-status-codes");
const BaseError = require("./base-error");

class ConflictError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.CONFLICT,
    description = "Conflict."
  ) {
    super(name, statusCode, description);
  }
}

module.exports = ConflictError;
