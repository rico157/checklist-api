const apiRouter = require('express').Router();
const tasksRouter = require('./tasks-router.js');

apiRouter.use('/tasks', tasksRouter);

module.exports = apiRouter;
