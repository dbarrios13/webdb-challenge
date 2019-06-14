
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', tbl => {
      tbl
        .increments()
      tbl
        .string('name', 128)
        .notNullable()
        .unique()
      tbl
        .text('description')
      tbl
        .text('notes')
      tbl
        .boolean('completed')
        .defaultTo(false)
      tbl
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions')
};