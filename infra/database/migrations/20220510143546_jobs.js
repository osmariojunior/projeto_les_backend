/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("jobs", (table) => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.text("description");
    table.integer("owner_id").notNullable();
    table.string("owner_type", 255).notNullable();
    table.integer("dollar_salary").notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
    table.index(["owner_id"]);
    table.index(["owner_type"]);
    table.index(["name"]);
    table.index(["dollar_salary"]);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("jobs");
