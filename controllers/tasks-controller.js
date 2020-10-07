const {
  selectTasks,
  updateTasks,
  insertTask,
  removeTask
} = require('../models/tasks-model.js');

exports.getTasks = (req, res, next) => {
  selectTasks()
    .then((tasks) => res.status(200).send({ tasks }))
    .catch(next);
};

exports.patchTasks = (req, res, next) => {
  const { task_id } = req.params;
  const { completed } = req.body;
  updateTasks(task_id, completed)
    .then((task) => res.status(200).send({ task }))
    .catch(next);
};

exports.postTask = (req, res, next) => {
  insertTask(req.body)
    .then((task) => {
      res.status(201).send({ task });
    })
    .catch(next);
};

exports.deleteTask = (req, res, next) => {
  const { task_id } = req.params;

  removeTask(task_id).then(() => {
    res.sendStatus(205);
  });
};
