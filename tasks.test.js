// __tests__/tasks.test.js
const request = require('supertest');
const app = require('../app'); // Assure-toi que tu exportes ton instance Express depuis app.js

describe('Test API de gestion des tâches', () => {
  
  let taskId;

  // Test de la route GET /tasks
  it('devrait obtenir toutes les tâches', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);  // Vérifie que la réponse est un tableau
  });

  // Test de la route POST /tasks
  it('devrait créer une nouvelle tâche', async () => {
    const newTask = {
      title: 'Nouvelle tâche',
      completed: false
    };

    const response = await request(app).post('/tasks').send(newTask);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTask.title);
    taskId = response.body.id; // Sauvegarde l'ID de la tâche créée pour les tests suivants
  });

  // Test de la route PUT /tasks/:id
  it('devrait mettre à jour une tâche', async () => {
    const updatedTask = {
      title: 'Tâche mise à jour',
      completed: true
    };

    const response = await request(app).put(`/tasks/${taskId}`).send(updatedTask);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTask.title);
    expect(response.body.completed).toBe(updatedTask.completed);
  });

  // Test de la route DELETE /tasks/:id
  it('devrait supprimer une tâche', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(204); // Suppression réussie, pas de corps de réponse
  });
});
