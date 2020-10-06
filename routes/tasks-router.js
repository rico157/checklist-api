const tasksRouter = require('express').Router();
const { getTasks, patchTasks } = require('../controllers/tasks-controller.js');

tasksRouter.route('/').get(getTasks);
tasksRouter.route('/:task_id').patch(patchTasks);

module.exports = tasksRouter;
