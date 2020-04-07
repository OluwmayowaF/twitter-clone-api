/* eslint-disable no-undef */
import Server from '../../server';

process.env.NODE_ENV = 'test';
let app;

require('dotenv').config();
const supertest = require('supertest');

let request;

const { closeDatabase } = require('../../utils/testdbhandler');

let token;
let userId;


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

describe('Test view logged in user route', () => {
  test('Returns logged in user with given token', async (done) => {
    await request.post('/api/v1/users').send({
      username: 'Sunny',
      password: 'sunny123456',
      email: 'gabby@saules.com',
    }).catch((e) => e);

    const testUser = await request.post('/api/v1/users/login').send({
      username: 'Sunny',
      password: 'sunny123456',
    }).catch((e) => e);

    token = testUser.body.token;
    userId = testUser.body.user._id;

    const result = await request.get('/api/v1/user').set('Authorization', token).catch((e) => e);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Logged in user details');
    done();
  });
  test('Returns an authorization error if no auth token is set', async (done) => {
    const result = await request.get('/api/v1/user').set('Authorization', '').catch((e) => e);

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Authorization Token not found');
    done();
  });
  test('Returns an authorization error if no auth token is set', async (done) => {
    const result = await request.get('/api/v1/user').set('Authorization', 'ggvdtghjhygy').catch((e) => e);

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Invalid Token');
    done();
  });
});
describe('Test view a specific user route', () => {
  test('Returns details of user whose id is given', async (done) => {
    const result = await request.get(`/api/v1/user/${userId}`).set('Authorization', token).catch((e) => e);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Found User ');
    done();
  });
  test('Returns 404 when user is not found', async (done) => {
    const deletedUser = '5e8c3017b9834ca8857fafa3';
    const result = await request.get(`/api/v1/user/${deletedUser}`).set('Authorization', token).catch((e) => e);
    expect(result.status).toBe(404);
    expect(result.body.message).toBe('User not found');
    done();
  });
});
describe('Test view all users route', () => {
  test('Returns all registered users', async (done) => {
    const result = await request.get('/api/v1/users').set('Authorization', token).catch((e) => e);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe(`${result.body.users.length} users Found`);
    done();
  });
});
