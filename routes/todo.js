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
  const newTodo = { id: todos.length + 1, title, completed: false };  // Ajout du statut 'completed'
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route PATCH pour marquer une tâche comme terminée
router.patch('/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  todo.completed = true;  // Marquer la tâche comme terminée
  res.json(todo);
});

// Route DELETE pour supprimer une tâche
router.delete('/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === todoId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  todos.splice(index, 1);  // Supprimer la tâche
  res.status(204).send();  // Réponse sans contenu (No Content)
});

module.exports = router;
