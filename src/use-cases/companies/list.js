module.exports =
  (knex) =>
  async ({ name_filter, limit = 25, offset = 0 }) => {
    return knex("companies")
      .limit(limit)
      .offset(offset)
      .modify((queryBuilder) => {
        if (name_filter) {
          queryBuilder.where("name", "like", `${name_filter}%`);
        }
      });
  };
