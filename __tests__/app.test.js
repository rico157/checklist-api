const request = require('supertest');
const knex = require('../db/connection');
const app = require('../app');

beforeEach(function () {
  return knex.seed.run();
});

afterAll(() => {
  return knex.destroy();
});

describe('/api', () => {
  describe('/tasks', () => {
    describe('GET', () => {
      test('status:200 && an object with an array containing all tasks', () => {
        return request(app)
          .get('/api/tasks')
          .expect(200)
          .then(({ body: { tasks } }) => {
            expect(tasks.length).toBe(3);
          });
      });
      test('status:200 && each object has the right keys', () => {
        return request(app)
          .get('/api/tasks')
          .expect(200)
          .then(({ body: { tasks } }) => {
            tasks.forEach((task) => {
              expect(task.hasOwnProperty('task')).toBe(true);
              expect(task.hasOwnProperty('completed')).toBe(true);
              expect(task.hasOwnProperty('dueBy')).toBe(true);
            });
          });
      });
    });
    describe('PATCH', () => {
      test('status:200 && with an object with a tasks', () => {
        return request(app)
          .patch('/api/tasks/1')
          .send({ completed: 'true' })
          .expect(200)
          .then(({ body: { task } }) => {
            console.log(task);
            expect(task).not.toBe(undefined);
          });
      });
      xtest('status:200 && the object has the right keys', () => {
        return request(app)
          .get('/api/tasks')
          .expect(200)
          .then(({ body: { task } }) => {
            expect(task.hasOwnProperty('task')).toBe(true);
            expect(task.hasOwnProperty('completed')).toBe(true);
            expect(task.hasOwnProperty('dueBy')).toBe(true);
          });
      });
      xtest('status:200 && the object is updated', () => {
        return request(app)
          .get('/api/tasks')
          .expect(200)
          .then(({ body: { task } }) => {
            expect(task.hasOwnProperty('task')).toBe(true);
            expect(task.hasOwnProperty('completed')).toBe(true);
            expect(task.hasOwnProperty('dueBy')).toBe(true);
          });
      });
    });
  });
});
