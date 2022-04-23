module.exports =
  (knex) =>
  async ({ name }) => {
    const existence = await knex("companies").where({
      name: name,
    });
    return existence && existence.length > 0;
  };
