const requestSchema = require("./request-schema");
const knex = require("../../../../../infra/database/index");
const ValidationError = require("../../../../errors/validation-error");
const ForbiddenError = require("../../../../errors/forbidden-error");
const NotFoundError = require("../../../../errors/not-found");
const httpStatusCode = require("../../../../constants/http-status-codes");
const jwt = require("jsonwebtoken");

const findCompany = require("../../../../use-cases/companies/find");
const listJobs = require("../../../../use-cases/jobs/list");

const switchRole = async (req, res) => {
  const validity = await requestSchema.isValid(req.body);

  if (!validity) {
    throw new ValidationError("Bad Request.");
  }

  const dep = switchRole.dependencies();

  const [company] = await dep.findCompany({ id: req.body.companyId });
  if (!company) {
    throw new NotFoundError("Company Not Found.");
  }

  if (company.owner_id !== req.identification.user.id) {
    throw new ForbiddenError("Not authorized to access this company.");
  }

  const token = await jwt.sign(
    {
      company: {
        id: company.id,
        owner_id: company.owner_id,
      },
    },
    process.env.AUTH_SECRET,
    {
      expiresIn: 86400,
    }
  );

  const jobs =
    (await dep.listJobs({
      ownerType: "COMPANY",
      ownerId: company.id,
      limit: Number.MAX_SAFE_INTEGER,
    })) || [];

  res.status(httpStatusCode.OK).send({
    auth: {
      token: token,
      expires: 86400,
    },
    data: {
      jobs: jobs,
    },
  });
};

switchRole.dependencies = () => ({
  findCompany: findCompany(knex),
  listJobs: listJobs(knex),
});

module.exports = switchRole;
