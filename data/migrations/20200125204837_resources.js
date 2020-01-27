exports.up = function(knex) {
  return knex.schema.createTable("resources", function(resources) {
    resources.increments();

    resources
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    resources.string("description", 128).notNullable();
    resources.text("name").notNullable();
    resources.boolean("completed").defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("resources");
};
