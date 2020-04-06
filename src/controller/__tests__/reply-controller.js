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
let replyId;

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


describe('Test Reply Post Route', () => {
  test('Empty Replies cannot be posted', async (done) => {
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
      tweet: 'It wasnt me',
    }).set('Authorization', token).catch((e) => e);

    tweetId = tweet.body.tweet._id;
    const reply = await request.post(`/api/v1/tweet/${tweetId}/reply`).send({
      reply: '',
    }).set('Authorization', token).catch((e) => e);
    expect(reply.status).toBe(400);
    done();
  });
  test('Replies can be posted', async (done) => {
    const reply = await request.post(`/api/v1/tweet/${tweetId}/reply`).send({
      reply: 'i saw you',
    }).set('Authorization', token).catch((e) => e);
    expect(reply.status).toBe(201);

    replyId = reply.body.reply._id;
    done();
  });
});
describe('Test Reply Get Route', () => {
  test('Can view a reply', async (done) => {
    const reply = await request.get(`/api/v1/reply/${replyId}`)
      .set('Authorization', token).catch((e) => e);
    expect(reply.status).toBe(200);
    done();
  });
});
