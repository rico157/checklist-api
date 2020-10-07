const tasksRouter = require('express').Router();
const {
  getTasks,
  patchTasks,
  postTask,
  deleteTask
} = require('../controllers/tasks-controller.js');

tasksRouter.route('/').get(getTasks).post(postTask);
tasksRouter.route('/:task_id').patch(patchTasks).delete(deleteTask);

module.exports = tasksRouter;
