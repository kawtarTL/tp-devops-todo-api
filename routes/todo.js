const express = require('express');
const router = express.Router();

// Liste des tâches en mémoire (cela pourrait être une base de données dans un projet réel)
let todos = [];

// Route GET pour récupérer toutes les tâches
router.get('/', (req, res) => {
  res.json(todos);
});

// Route POST pour ajouter une tâche
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Le titre de la tâche est requis.' });
  }
  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = router;
