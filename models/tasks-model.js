const knex = require('../db/connection.js');

exports.selectTasks = () => {
  return knex.select('*').from('tasks').returning('*');
};

exports.updateTasks = (task_id, completed) => {
  return knex
    .update({ completed })
    .from('tasks')
    .where({ task_id })
    .returning('*');
};
