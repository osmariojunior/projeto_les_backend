const { loginUseCase } = require("../../../../use-cases/users/login");
const knex = require("../../../../../infra/database/index");
const NotFoundError = require("../../../../errors/not-found");
const httpStatusCode = require("../../../../constants/http-status-codes");
const jwt = require("jsonwebtoken");
const findCompanies = require("../../../../use-cases/companies/find");
const listJobs = require("../../../../use-cases/jobs/list");

const login = async (req, res) => {
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

  const companies =
    (await dep.findCompanies({
      ownerId: user.id,
    })) || [];

  const jobs =
    (await dep.listJobs({
      ownerType: "USER",
      ownerId: user.id,
      limit: Number.MAX_SAFE_INTEGER,
    })) || [];

  res.status(httpStatusCode.OK).send({
    auth: {
      token: token,
      expires: 86400,
    },
    data: {
      companies: companies,
      jobs: jobs,
      user: {
        name: user.first_name + " " + user.last_name,
        nickname: user.nickname,
        email: user.email,
        id: user.id,
      },
    },
  });
};

login.dependencies = () => ({
  loginUseCase: loginUseCase(knex),
  findCompanies: findCompanies(knex),
  listJobs: listJobs(knex),
});

module.exports = {
  login,
};
