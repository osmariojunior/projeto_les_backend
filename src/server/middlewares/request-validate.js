const ValidationError = require("../../errors/validation-error");
const requestValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req);
  } catch (err) {
    throw new ValidationError("Bad Request.", 400, err.errors);
  }
  next();
};

module.exports = requestValidate;
