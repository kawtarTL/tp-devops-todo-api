const express = require('express');
const router = express.Router();

let todos = [];

router.get('/', (req, res) => res.json(todos));

router.post('/', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.status(201).json(todo);
});

module.exports = router;
