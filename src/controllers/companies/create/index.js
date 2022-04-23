const knex = require("../../../../infra/database/index");
const requestSchema = require("./request-schema");
const httpStatusCode = require("../../../constants/http-status-codes");

const {
  existsUseCase: userExists,
} = require("../../../use-cases/users/exists");
const companyExists = require("../../../use-cases/companies/exists");
const createCompany = require("../../../use-cases/companies/create");

const NotFoundError = require("../../../shared/errors/not-found");
const ConflictError = require("../../../shared/errors/conflict");
const ValidationError = require("../../../shared/errors/validation-error");

const create = async (req, res) => {
  const validity = await requestSchema.isValid(req.body);

  if (!validity) {
    throw new ValidationError("Bad Request.");
  }

  const dep = create.dependencies();

  const userExistence = await dep.userExists({
    id: req.identification.user.id,
  });
  if (!userExistence) {
    throw new NotFoundError("User Not Found.");
  }
  const companyExistence = await dep.companyExists({ name: req.body.name });
  if (companyExistence) {
    throw new ConflictError("Company already exists.");
  }

  const company = await dep.createCompany({
    ...req.body,
    ownerId: req.identification.user.id,
  });
  res.status(httpStatusCode.CREATED).send({
    name: company.name,
    description: company.description,
    country: company.country,
    state: company.state,
    city: company.city,
    owner_id: company.owner_id,
    id: company.id,
  });
};

create.dependencies = () => ({
  userExists: userExists(knex),
  companyExists: companyExists(knex),
  createCompany: createCompany(knex),
});

module.exports = create;
