const ENV = process.env.NODE_ENV || 'development';
const taskData = require(`./${ENV}-data`);
const config = {
  development: {
    taskData
  },
  test: {
    taskData
  },
  production: {
    taskData
  }
};

module.exports = { ...config[ENV] };
