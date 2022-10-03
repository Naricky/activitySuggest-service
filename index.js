const express = require('express');
const { json } = require('body-parser');
const cors = require('cors')

const { PORT } = require('./config')
const activityController = require('./src/services/activities/controller')
const userController = require('./src/services/users/controller')

const app = express();

app.use(json());
app.use(cors())

const FakeDB = require('fake-db');
// Note: As per Level 2 part of the assignment, POST user route is still functional
// This 'seed' for mock db is included to save you time when testing out user custom
// activity route
const db = new FakeDB([{
  "name": "John Doe",
  "accessibility": "High",
  "price": "Low"
}]);


// Note: If we get more routes, break it in to its own directories
// eg: src/routes/index.js -> we can further break in to routes within
// each services, i.e: src/routes *import users/routes/index*
// Purposely pseudo-coded this to show it is sometimes better not to preoptimize ;)
app.get(`/healthcheck`, (_, res) => res.sendStatus(200));

app.get('/activity', async (_, res) => {
  // Note: based on assumption, we will always assume first data
  // in the mock db is the currentUser, but realistically we should have
  // a validation layer here to ensure user has permission/and accessbility
  const data = await activityController.get(db)
  res.send(data)
})

app.get('/user/activity', async (req, res) => {
  // Note: AC was little vague if we want to support default get call or not
  // Will have it as separate endpoint just to confirm both cases
  // Example endpoint http://localhost:8000/user/activity?id=example
  const data = await activityController.get(db, req.query)
  res.send(data)
})

app.post('/user', async (req,res) => {
  const users = await userController.create(db, req.body)
  // returns the user just added
  res.send(users[users.length -1])
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
