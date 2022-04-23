const knex = require("../../../../infra/database/index");
const listCompanies = require("../../../use-cases/companies/list");
const requestSchema = require("./request-schema");

const list = async (req, res) => {
  const validity = await requestSchema.isValid(req.query);
  if (!validity) {
    throw new ValidationError("Bad Request.");
  }

  const dep = list.dependencies();

  const companies = await dep.listCompanies(req.query);
  res.send({
    companies: companies.map((company) => {
      delete company.created_at;
      delete company.updated_at;
      delete company.owner_id;
      return company;
    }),
  });
};

list.dependencies = () => ({
  listCompanies: listCompanies(knex),
});

module.exports = list;
