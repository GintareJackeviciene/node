const express = require('express');
const { validateUser } = require('../middleware');
// sukuriam routeri
const usersRouter = express.Router();

// data
let users = [
  {
    id: 1,
    name: 'James',
    town: 'London',
    isDriver: false,
    isDeleted: false,
  },
  {
    id: 2,
    name: 'Mike',
    town: 'Kaunas',
    isDriver: true,
  },
  {
    id: 3,
    name: 'Bob',
    town: 'Vilnius',
    isDriver: false,
  },
  {
    id: 4,
    name: 'Jane',
    town: 'Klaipeda',
    isDriver: true,
  },
];

// Routes
// GET - /api/users - grazinti visus userius
usersRouter.get('/api/users', (request, response) => {
  response.status(200).json(users);
});

// GET - /api/users/drivers - grazins visus vairuotojus

// GET - /api/users/town - grazinsi visus miestus masyvo pavidalu
usersRouter.get('/api/users/town', (request, response) => {
  const townsArr = users.map((uObj) => uObj.town);
  console.log('townsArr ===', townsArr);
  response.json(townsArr);
});

// GET - /api/users/1 - grazinti konretu  useri
// :userId dinamine dalis
usersRouter.get('/api/users/:userId', (request, response) => {
  console.log('request.params ===', request.params);
  const userId = +request.params.userId;
  // surasti objekta su id === userId ir ji grazinti
  const found = users.find((userObj) => userId === userObj.id);
  console.log('found ===', found);
  // TODO: not found case
  // jei neradom
  if (found === undefined) {
    response.status(404).json({ msg: `user with id ${userId} was not found` });
    return;
  }
  response.json(found);
});

//  DELETE - /api/users/2 - delete user with id
usersRouter.delete('/api/users/:userId', (request, response) => {
  const userId = +request.params.userId;
  // grazlinti viska iskryrus ta el kurio id yra = userId
  users = users.filter((uObj) => uObj.id !== userId);
  console.log('users ===', users);
  response.json(users);
});

usersRouter.post('/api/users', validateUser, (req, res) => {
  const { name, town, isDriver } = req.body;

  const newUser = {
    id: +Math.random().toString().slice(3),
    name,
    town,
    isDriver,
  };

  console.log('newUser ===', newUser);
  users.push(newUser);
  res.sendStatus(201);
});

// PUT  /api/users/2 - updates users with id 2 object
usersRouter.put('/api/users/:userId', validateUser, (req, res) => {
  const userId = +req.params.userId;
  // surasti ir pakeisti esama objekta
  const foundIdx = users.findIndex((uObj) => uObj.id === userId);
  // found.name = req.body.name;
  // found.town = req.body.town;
  // found.isDriver = req.body.isDriver;
  users[foundIdx] = {
    id: userId,
    ...req.body,
  };
  // console.log('found ===', found);
  // grazinsim pakeista masyva i fronta

  res.json(users);
});

module.exports = usersRouter;