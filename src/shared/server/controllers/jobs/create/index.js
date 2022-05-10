const knex = require("../../../../../../infra/database/index");
const requestSchema = require("./request-schema");
const httpStatusCode = require("../../../../../constants/http-status-codes");
const createJob = require("../../../../../use-cases/jobs/create");

const ValidationError = require("../../../../errors/validation-error");

const create = async (req, res) => {
  const validity = await requestSchema.isValid(req.body);

  if (!validity) {
    throw new ValidationError("Bad Request.");
  }

  const dep = create.dependencies();

  const isCompany = req.identification.company?.id;

  const job = await dep.createJob({
    ...req.body,
    ownerId: isCompany
      ? req.identification.company?.id
      : req.identification.user.id,
    ownerType: isCompany ? "COMPANY" : "USER",
  });

  res.status(httpStatusCode.CREATED).send({
    id: job.id,
    name: job.name,
    description: job.description,
    dollar_salary: job.dollar_salary,
  });
};

create.dependencies = () => ({
  createJob: createJob(knex),
});

module.exports = create;
