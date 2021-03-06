# Checklist API Mini-App

### Features:
- [x] Homepage with the pre-seeded tasks 
**GET** request when page loads


- [x] Mark tasks to do/done 
**PATCH** request when clicked on a task

- [x] Add a new task to the database **POST** request when a new task is added

- [x] Delete a task from the database **DELETE** request when a new task is deleted

- [x] Sort by table headers (*Done*, *Tasks*, *Date*) **ascending** or **descending**.

---
![Screenshot](https://github.com/rico157/checklist-api/blob/master/screenshot/homepage-screenshot.png)
## Endpoints available
---
* #### Get all tasks
```http
GET /api/tasks
```
---
* #### Update the *completed* property
```http
PATCH /api/tasks/:task_id
```
##### With a body like:
```json
{
  "completed": "true"
}
```
---
* #### Delete a task
```http
DELETE /api/tasks/:task_id
```
---
* #### Add a new task
```http
POST /api/tasks/
```
##### With a body like:
```json
{
  "task": "task message",   
  "completed": "false",
  "dueBy": "YYYY-MM-DD"
}
```

---

### Tech Stack

#### Front-end

* Basic HTML, CSS and JavaScript
* CSS Framework: [Skeleton](http://getskeleton.com/)


#### Back-end
* Runtime Enviroment: [Node.js](https://nodejs.org/)
* Framework: [express.js](https://expressjs.com/)
* Database: [PostgreSQL](https://www.postgresql.org/) 
* Database migrations: [Knex.js](http://knexjs.org/)

#### TDD 
* Testing Framework: [Jest](https://jestjs.io/)
* HTTP Requests: [supertest](https://www.npmjs.com/package/supertest)
---
### Requirements

* [PostgreSQL](https://www.postgresql.org/) 
* [Node.js](https://nodejs.org/)

## How to install

* Clone the repository

```
$ git clone https://github.com/rico157/checklist-api.git
```

* Install all the node packages with the command:

```
$ npm i
```

* Create/recreate the database with the command:

```
$ npm run setup-dbs
```

* Insert data to the database with the command:

```
$ npm run seed
```

* Start the server with the command:

```
$ npm start
```

* Go to [http://localhost:9090/](http://localhost:9090/index.html)


## Scripts available

```
$ npm start ---> starts the server on PORT 9090
$ npm run listen ---> starts the server on PORT 9090 with nodemon (the server will restart automatically for every change)
$ npm test ---> run the test suite
$ npm run migrate-make my-new-table-name ---> create a new migration table
$ npm run migrate-latest ---> go to the latest migration
$ npm run migrate-rollback ---> go to the first migration

```
## Similar Project:
**HTML, CSS, JS:** [Checklist Mini-App Challange](https://github.com/rico157/checklist-challenge)
**REST API:** [Fake-News API](https://github.com/rico157/rico-fake-news-api)
