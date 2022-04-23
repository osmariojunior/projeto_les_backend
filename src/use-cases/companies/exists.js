module.exports =
  async (knex) =>
  ({ name }) => {
    const existence = await knex("companies").where({
        name,
      });
    return existence && existence.length > 0
  };
