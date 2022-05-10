module.exports =
  (knex) =>
  async ({
    name,
    companyName,
    minSalary,
    maxSalary,
    ownerType = "COMPANY",
    limit = 10,
    offset = 0,
  }) =>
    knex("jobs")
      .select(["jobs.*", "companies.name as company_name"])
      .innerJoin("companies", "jobs.owner_id", "companies.id")
      .limit(limit)
      .offset(offset)
      .modify((queryBuilder) => {
        if (name) {
          queryBuilder.andWhereLike("jobs.name", `${name}%`);
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
