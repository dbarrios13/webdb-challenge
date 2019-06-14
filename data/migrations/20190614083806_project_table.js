
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', tbl => {
      // id of project
      tbl
        .increments()
      // name of project
      tbl
        .string('name', 128)
        .notNullable()
        .unique()
      // description of project
      tbl
        .text('description')
        .notNullable()
      // completion of project
      tbl
        .boolean('completed')
        .defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects')
};
