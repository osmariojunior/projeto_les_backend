module.exports =
  async (knex) =>
  ({ name, description, ownerId, country, state, city }) => {
    return knex("companies")
      .insert({
        name,
        description,
        owner_id: ownerId,
        country,
        state,
        city,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning("*");
  };
