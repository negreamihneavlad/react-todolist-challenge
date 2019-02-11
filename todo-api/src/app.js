const express = require('express');
const { findIndex, remove } = require('lodash');

const todos = [
  {
    id: '5467d120-2df8-11e9-93d0-096c64e38a28',
    content: 'First Task',
  },
  {
    id: '5467d120-2df8-11e9-93d0-0917c64e38a28',
    content: 'Second Task',
  },
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Todo Routes
app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
  const newTodo = { ...req.body };
  todos.push(newTodo);
  //   res.status(500);
  res.send(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const index = findIndex(todos, { id: req.params.id });
  todos.splice(index, 1, req.body);
  //   res.status(500);
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  remove(todos, { id: req.params.id });
  //   res.status(500);
  res.send();
});

app.listen(4000);
