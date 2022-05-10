module.exports =
  (knex) =>
  async ({ id, ownerId }) => {
    return knex("companies")
      .select(["id", "name", "description", "country", "state", "city"])
      .where({
        ...(id ? { id: id } : {}),
        ...(ownerId ? { owner_id: ownerId } : {}),
      });
  };
