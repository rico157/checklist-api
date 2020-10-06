exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('task_id').primary();
    table.string('task');
    table.string('completed').defaultsTo('false');
    table.string('dueBy');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
