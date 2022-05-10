class BaseError extends Error {
  constructor(name, statusCode, message) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
