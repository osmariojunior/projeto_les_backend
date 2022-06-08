module.exports =
  (knex) =>
  async ({
    name,
    companyName,
    minSalary,
    maxSalary,
    ownerId,
    ownerType = "COMPANY",
    limit = 10,
    offset = 0,
  }) =>
    knex("jobs")
      .select([
        "jobs.id",
        "jobs.name",
        "jobs.description",
        "jobs.dollar_salary",
        "companies.name as company_name",
      ])
      .leftJoin("companies", "jobs.owner_id", "companies.id")
      .limit(limit)
      .offset(offset)
      .modify((queryBuilder) => {
        if (name) {
          queryBuilder.andWhereLike("jobs.name", `${name}%`);
        }

        if (ownerId) {
          queryBuilder.andWhere("jobs.owner_id", ownerId);
        }

        if (companyName) {
          queryBuilder.andWhereLike("companies.name", `${companyName}%`);
        }

        if (minSalary) {
          queryBuilder.andWhere("jobs.dollar_salary", ">", minSalary);
        }

        if (maxSalary) {
          queryBuilder.andWhere("jobs.dollar_salary", "<", maxSalary);
        }
      });
