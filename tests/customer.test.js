const request = require('supertest');
const express = require('express');
const app = express();
const customerRoutes = require('../src/routes/customerRoutes');

app.use(express.json());
app.use('/api/customers', customerRoutes);

describe('Customer Endpoints', () => {
  test('GET /api/customers should return all customers', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('GET /api/customers/:id should return a customer by id', async () => {
    const res = await request(app).get('/api/customers/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('CustomerID');
  });

  test('POST /api/customers should create a new customer', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({
        FirstName: 'Test',
        LastName: 'User',
        Email: 'testuser@example.com',
        Phone: '1234567890',
        Address: '123 Test St',
        City: 'Test City',
        State: 'Test State',
        ZipCode: '12345',
        Country: 'Test Country',
        IsPremium: false
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('CustomerID');
  });

  test('PUT /api/customers/:id should update a customer', async () => {
    const res = await request(app)
      .put('/api/customers/1')
      .send({
        FirstName: 'Updated',
        LastName: 'User',
        Email: 'updateduser@example.com',
        Phone: '0987654321',
        Address: '456 Updated St',
        City: 'Updated City',
        State: 'Updated State',
        ZipCode: '54321',
        Country: 'Updated Country',
        IsPremium: true
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('CustomerID');
  });

  test('DELETE /api/customers/:id should delete a customer', async () => {
    const res = await request(app).delete('/api/customers/1');
    expect(res.statusCode).toEqual(204);
  });
});