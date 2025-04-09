const request = require('supertest');
const app = require('./index');  // Assurez-vous que l'import pointe vers index.js

describe('API To-Do', () => {
  it('devrait récupérer la liste des tâches', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('devrait ajouter une nouvelle tâche', async () => {
    const newTodo = { title: 'Nouvelle tâche' };
    const response = await request(app).post('/api/todos').send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.completed).toBe(false);
  });

  it('devrait marquer une tâche comme terminée', async () => {
    const newTodo = { title: 'Tâche à terminer' };
    const createdResponse = await request(app).post('/api/todos').send(newTodo);
    const todoId = createdResponse.body.id;

    const response = await request(app).patch(`/api/todos/${todoId}`).send({ completed: true });
    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it('devrait supprimer une tâche', async () => {
    const newTodo = { title: 'Tâche à supprimer' };
    const createdResponse = await request(app).post('/api/todos').send(newTodo);
    const todoId = createdResponse.body.id;

    const response = await request(app).delete(`/api/todos/${todoId}`);
    expect(response.status).toBe(204);
  });
});
