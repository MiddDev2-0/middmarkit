/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return Promise.all([
    knex.schema.table("Item", (table) => {
      table.boolean("adminApproved").notNullable().defaultTo(false);
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return Promise.all([
    knex.schema.table("Item", (table) => {
      table.dropColumn("adminApproved");
    }),
  ]);
};
