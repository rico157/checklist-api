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

exports.insertTask = (body) => {
  return knex('tasks').insert(body).into('tasks');
};

exports.removeTask = (task_id) => {
  console.log(task_id);
  return knex('tasks').delete('*').where({ task_id });
};
