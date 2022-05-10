const { loginUseCase } = require("../../../../../use-cases/users/login");
const knex = require("../../../../../../infra/database/index");
const requestSchema = require("./request-schema");
const ValidationError = require("../../../../errors/validation-error");
const NotFoundError = require("../../../../errors/not-found");
const httpStatusCode = require("../../../../../constants/http-status-codes");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const validity = await requestSchema.isValid(req.body);

  if (!validity) {
    throw new ValidationError("Bad Request.");
  }

  const dep = login.dependencies();

  const user = await dep.loginUseCase(req.body);
  if (!user) {
    throw new NotFoundError("User Not Found.");
  }
  const token = await jwt.sign(
    {
      user: {
        id: user.id,
      },
    },
    process.env.AUTH_SECRET,
    {
      expiresIn: 86400,
    }
  );
  res.status(httpStatusCode.OK).send({
    auth: true,
    token: token,
    expires: 86400,
  });
};

login.dependencies = () => ({
  loginUseCase: loginUseCase(knex),
});

module.exports = {
  login,
};
