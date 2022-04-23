module.exports =
  (knex) =>
  async ({ id }) => {
    return knex("companies").where({
      id: id,
    });
  };
