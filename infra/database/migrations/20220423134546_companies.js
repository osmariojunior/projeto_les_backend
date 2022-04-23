/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("companies", (table) => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.text("description");
    table.string("country", 255).notNullable();
    table.string("state", 255).notNullable();
    table.string("city", 255).notNullable();
    table.integer("owner_id").notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
    table.index(["owner_id"]);
    table.index(["name"]);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("companies");
