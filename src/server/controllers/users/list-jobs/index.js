const knex = require("../../../../../infra/database/index");
const NotFoundError = require("../../../../errors/not-found");
const httpStatusCode = require("../../../../constants/http-status-codes");
const listJobsUseCase = require("../../../../use-cases/jobs/list");

const listJobs = async (req, res) => {
  const dep = listJobs.dependencies();

  const jobs = await dep.listJobsUseCase({
    ownerId: req.identification.user.id,
    ownerType: "USER",
  });

  if (!jobs) {
    throw new NotFoundError("No jobs found.");
  }

  res.status(httpStatusCode.OK).send({
    jobs: jobs.map((job) => {
      delete job.created_at;
      delete job.updated_at;
      delete job.owner_id;
      return job;
    }),
  });
};

listJobs.dependencies = () => ({
  listJobsUseCase: listJobsUseCase(knex),
});

module.exports = {
  listJobs,
};
