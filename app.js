const apiRouter = require('./routes/api-router.js');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
