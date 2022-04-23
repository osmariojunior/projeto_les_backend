module.exports =
  (knex) =>
  async ({ name, description, ownerId, ownerType, dollarSalary }) => {
    return knex("jobs")
      .insert({
        name,
        description,
        owner_id: ownerId,
        owner_type: ownerType,
        dollar_salary: dollarSalary,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning("*");
  };
