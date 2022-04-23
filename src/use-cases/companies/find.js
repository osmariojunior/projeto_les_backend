module.exports =
  (knex) =>
  async ({ id, ownerId }) => {
    return knex("companies").where({
      ...(id ? { id: id } : {}),
      ...(ownerId ? { ownerId: ownerId } : {}),
    });
  };
