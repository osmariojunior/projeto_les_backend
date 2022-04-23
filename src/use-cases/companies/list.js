module.exports =
  async (knex) =>
  ({ filter, limit = 25, offset = 0 }) => {
    return knex("companies")
      .where("name", "like", `%${filter}`)
      .limit(limit)
      .offset(offset);
  };
