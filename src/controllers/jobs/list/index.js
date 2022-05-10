const knex = require("../../../../infra/database/index");
const listUseCase = require("../../../use-cases/jobs/list");

const list = async (req, res) => {
  const dep = list.dependencies();

  const jobs = await dep.listUseCase(req.query);
  res.send({
    jobs: jobs.map((job) => {
      delete job.owner_id;
      delete job.owner_type;
      return job;
    }),
  });
};

list.dependencies = () => ({
  listUseCase: listUseCase(knex),
});

module.exports = list;
