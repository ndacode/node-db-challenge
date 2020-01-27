exports.up = function(knex) {
  return knex.schema.createTable("project_resources", tbl => {
    tbl.increments();
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("project_id")
      .inTable("project")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

    tbl
      .integer("resource_id")
      .unsigned()
      .notNullable()
      .references("resource_id")
      .inTable("project")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("project_resources");
};
