const { taskData } = require('../data/index.js');

exports.seed = function (knex) {
  return knex.migrate.rollback().then(() =>
    knex.migrate.latest().then(() => {
      return knex.insert(taskData).into('tasks');
    })
  );
};
