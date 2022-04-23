const knex = require("../../../../infra/database/index");
const NotFoundError = require("../../../shared/errors/not-found");
const httpStatusCode = require("../../../constants/http-status-codes");
const findCompanies = require("../../../use-cases/companies/find");

const listCompanies = async (req, res) => {
  const dep = listCompanies.dependencies();

  const companies = await dep.findCompanies({
    ownerId: req.identification.user.id,
  });

  if (!companies) {
    throw new NotFoundError("No companies found.");
  }

  res.status(httpStatusCode.OK).send({
    companies: companies.map((company) => {
      delete company.created_at;
      delete company.updated_at;
      delete company.owner_id;
      return company;
    }),
  });
};

listCompanies.dependencies = () => ({
  findCompanies: findCompanies(knex),
});

module.exports = {
  login,
};
