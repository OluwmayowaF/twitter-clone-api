/* eslint-disable no-undef */
import Server from '../../server';


process.env.NODE_ENV = 'test';
let app;

require('dotenv').config();
const supertest = require('supertest');

let request;

const { closeDatabase } = require('../../utils/testdbhandler');

let token;
let tweetId;

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


describe('Test Tweet Post Route', () => {
  test('Empty Tweets cannot be posted', async (done) => {
    await request.post('/api/v1/users').send({
      username: 'Sunny',
      password: 'sunny123456',
      email: 'gabby@saules.com',
    }).catch((e) => e);

    const result = await request.post('/api/v1/users/login').send({
      username: 'Sunny',
      password: 'sunny123456',
    }).catch((e) => e);

    token = result.body.token;

    const tweet = await request.post('/api/v1/tweets').send({
      tweet: '',
    }).set('Authorization', token).catch((e) => e);
    expect(tweet.status).toBe(400);
    done();
  });
  test('Tweet can be posted', async (done) => {
    const tweet = await request.post('/api/v1/tweets').send({
      tweet: 'It wasnt me',
    }).set('Authorization', token).catch((e) => e);
    expect(tweet.status).toBe(201);
    done();
  });
});
describe('Test logged in user tweets route Route', () => {
  test('Tweet can be posted', async (done) => {
    const tweet = await request.get('/api/v1/tweets').set('Authorization', token).catch((e) => e);
    expect(tweet.status).toBe(200);
    tweetId = tweet.body.tweet[0]._id;
    done();
  });
});
describe('Test logged in user can view timeline', () => {
  test('Tweet can be posted', async (done) => {
    const tweet = await request.get('/api/v1/timeline').set('Authorization', token).catch((e) => e);
    expect(tweet.status).toBe(200);
    done();
  });
});
describe('Test view a specific tweet route', () => {
  test('Tweet can be posted', async (done) => {
    const tweet = await request.get(`/api/v1/tweet/${tweetId}`).set('Authorization', token).catch((e) => e);
    expect(tweet.status).toBe(200);
    done();
  });
});
