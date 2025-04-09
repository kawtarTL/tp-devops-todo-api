const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Autoriser toutes les connexions CORS
app.use(express.json()); // Pour analyser le JSON dans les requêtes

// Servir les fichiers statiques (HTML, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Import des routes (todo.js)
const todoRoutes = require('./routes/todo');
app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Serveur API ToDo en cours d'exécution sur http://localhost:${port}`);
});
