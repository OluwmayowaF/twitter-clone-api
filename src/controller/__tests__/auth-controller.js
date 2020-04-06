/* eslint-disable no-undef */
import AuthController from '../auth-controller';

const app = require('../../index');

require('dotenv').config();

process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const request = supertest(app);
const { closeDatabase } = require('../../utils/testdbhandler');


let token;
let userId;

afterAll(async (done) => {
  await closeDatabase();
  setTimeout(() => { process.exit(1); }, 10000);
  done();
});


describe('Test User registration route', () => {
  test('No username for registration', async (done) => {
    const req = {
      body: {
        username: '',
      },
    };
    const res = {};
    const result = await AuthController.register(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request: Please Provide Username');
    done();
  });
  test('No email used for registration', async (done) => {
    const req = {
      body: {
        username: 'Gabrielle Union',
        email: '',
      },
    };
    const res = {};
    const result = await AuthController.register(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request:Please Provide valid Email');
    done();
  });
  test('Invalid email used for registration', async (done) => {
    const req = {
      body: {
        username: 'Gabrielle Union',
        email: 'mail.com',
      },
    };
    const res = {};
    const result = await AuthController.register(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request:Please Provide valid Email');
    done();
  });
  test('No password used for registration', async (done) => {
    const req = {
      body: {
        username: 'Gabrielle Union',
        email: 'gblive@mail.com',
        password: '',
      },
    };
    const res = {};
    const result = await AuthController.register(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request: Password must have atleast 8 characters');
    done();
  });
  test('Password less than 8 characters used for registration', async (done) => {
    const req = {
      body: {
        username: 'Gabrielle Union',
        email: 'gblive@mail.com',
        password: '12345',
      },
    };
    const res = {};
    const result = await AuthController.register(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request: Password must have atleast 8 characters');
    done();
  });

  test('Password less than 8 characters used for registration', async (done) => {
    const req = {
      body: {
        username: 'Gabrielle Union',
        email: 'gblive@mail.com',
        password: '12345',
      },
    };
    const res = {};
    const result = await AuthController.register(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request: Password must have atleast 8 characters');
    done();
  });
  test('User can register with the correct credentials', async (done) => {
    const response = await request.post('/api/v1/users').send({
      username: 'Gabby Samuels',
      password: 'gabbby678',
      email: 'gabby@smaules.com',
    }).catch((e) => e);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User has been registered succesfully');
    done();
  });
  test('User cannot register with an exisiting user email', async (done) => {
    const response = await request.post('/api/v1/users').send({
      username: 'Gabby',
      password: 'gabbby678',
      email: 'gabby@smaules.com',
    }).catch((e) => e);
    // console.log(response);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User with that email already registered');
    done();
  });
  test('User cannot register with an exisiting user username', async (done) => {
    const response = await request.post('/api/v1/users').send({
      username: 'Gabby Samuels',
      password: 'gabbby678',
      email: 'gabby@saules.com',
    }).catch((e) => e);
    // console.log(response);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User with that username already registered');
    done();
  });
});
describe('Test Login route', () => {
  test('No username for login', async (done) => {
    const req = {
      body: {
        username: '',
      },
    };
    const res = {};
    const result = await AuthController.login(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request:Username  is required to login');
    done();
  });
  test('No/invalid password for login', async (done) => {
    const req = {
      body: {
        username: 'Gabby',
        password: '',
      },
    };

    const res = {};
    const result = await AuthController.login(req, res).catch((e) => e);

    expect(result.status).toBe(400);
    expect(result.message).toBe('Bad Request: Password must have atleast 8 characters');
    done();
  });
  test('User can login with the correct credentails', async (done) => {
    await request.post('/api/v1/users').send({
      username: 'Sunny',
      password: 'sunny123456',
      email: 'gabby@saules.com',
    }).catch((e) => e);

    const result = await request.post('/api/v1/users/login').send({
      username: 'Sunny',
      password: 'sunny123456',
    }).catch((e) => e);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('User logged in Succesfully');
    token = result.body.token;
    userId = result.body.user._id;
    done();
  });
  test('User can  not login with the wrong password', async (done) => {
    const result = await request.post('/api/v1/users/login').send({
      username: 'Sunny',
      password: 'sunny12456',
    }).catch((e) => e);

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Incorrect Password Please try again');
    done();
  });
  test('Unregistered Users cannot login', async (done) => {
    const result = await request.post('/api/v1/users/login').send({
      username: 'Samu',
      password: 'sunny12456',
    }).catch((e) => e);

    expect(result.status).toBe(404);
    expect(result.body.message).toBe('User with that username was not found');
    done();
  });
});
describe('Test view logged in user route', () => {
  test('Returns logged in user with given token', async (done) => {
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
  test('Returns logged in user with given token', async (done) => {
    console.log(userId);
    const result = await request.get(`/api/v1/user/${userId}`).set('Authorization', token).catch((e) => e);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Found User ');
    done();
  });
});
