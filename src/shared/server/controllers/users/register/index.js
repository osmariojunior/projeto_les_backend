const { createUseCase } = require("../../../../../use-cases/users/create");
const { existsUseCase } = require("../../../../../use-cases/users/exists");
const knex = require("../../../../../../infra/database/index");
const requestSchema = require("./request-schema");
const ValidationError = require("../../../../errors/validation-error");
const ConflictError = require("../../../../errors/conflict");
const httpStatusCode = require("../../../../../constants/http-status-codes");

const register = async (req, res) => {
  const validity = await requestSchema.isValid(req.body);

  if (!validity) {
    throw new ValidationError("Bad Request.");
  }

  const dep = register.dependencies();

  const nicknameOrEmailAlreadExists = await dep.existsUseCase({
    nickname: req.body.nickname,
    email: req.body.email,
  });

  if (nicknameOrEmailAlreadExists) {
    throw new ConflictError("Email or nickname already exists.");
  }

  const [user] = await dep.createUseCase(req.body);
  res.status(httpStatusCode.CREATED).send({
    name: user.first_name + " " + user.last_name,
    nickname: user.nickname,
    email: user.email,
    id: user.id,
  });
};

register.dependencies = () => ({
  createUseCase: createUseCase(knex),
  existsUseCase: existsUseCase(knex),
});

module.exports = {
  register,
};
