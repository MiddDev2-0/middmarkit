/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("User", (table) => {
      table.increments("id").primary();
      table.string("googleId");
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("email").notNullable();
      table.boolean("reviewerStatus").notNullable();
    }),

    knex.schema.createTable("Item", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("description").notNullable();
      table.integer("price").notNullable();
      table
        .integer("sellerId")
        .notNullable()
        .references("id")
        .inTable("User")
        .onDelete("CASCADE");
      table.string("datePosted");
      table.boolean("isAvailable").notNullable().defaultTo(true);
      table.string("images").notNullable();
      table.boolean("adminRemoved").notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("Item"),
    knex.schema.dropTableIfExists("User"),
  ]);
};
