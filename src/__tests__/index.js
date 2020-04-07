import Server from '../server';
import ErrorHandler from '../utils/error';

process.env.NODE_ENV = 'test';
let app;

require('dotenv').config();
const supertest = require('supertest');

let request;

const { closeDatabase } = require('../utils/testdbhandler');

beforeAll(async (done) => {
  app = await Server.start();
  request = supertest(app);
  done();
});
afterAll(async (done) => {
  await closeDatabase();
  await app.close();
  done();
});

test('Test base route', async () => {
  const result = await request.get('/').catch((e) => e);
  expect(result.status).toBe(200);
});
test('Test that invalid route error is handled properly', async () => {
  const result = await request.get('/people').catch((e) => e);
  expect(result.status).toBe(404);
});
