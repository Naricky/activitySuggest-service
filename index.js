const express = require('express');
const { json } = require('body-parser');

const { PORT } = require('./config')
const activityController = require('./src/services/activities/controller')
const userController = require('./src/services/users/controller')

const app = express();
app.use(json());

const FakeDB = require('fake-db');
const db = new FakeDB([]);


// Note: If we get more routes, break it in to its own folder
// eg: src/routes/index.js -> we can further break in to routes within
// each services, i.e: src/routes *import users/routes/index*
// Purposely pseudo-coded this to show it is sometimes better not to preoptimize ;)
app.get(`/healthcheck`, (_, res) => res.sendStatus(200));

app.get('/activity', async (req, res) => {
  // Note: based on assumption, we will always assume first data
  // in the mock db is the currentUser, but realistically we should have
  // a validation layer here to ensure user has permission/and accessbility
  const data = await activityController.get(db)
  res.send(data)
})

app.get('/user/:id/activity', async (req, res) => {
  console.info("TODO MAKE THIS ROUTE WORKING???")
  // Note: AC was little vague if we want to support default get call or not
  // Will have it as separate endpoint just to confirm both cases
  const data = await activityController.get(db, req.params.id)
  res.send(data)
})

app.post('/user', async (req,res) => {
  res.send(await userController.create(db, req.body))
})

app.listen(PORT, () => console.log(`api is running on ${PORT}`));
