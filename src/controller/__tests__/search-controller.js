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
      reply: 'i saw you',
    }).set('Authorization', token).catch((e) => e);

    replyId = reply.body.reply._id;

    const term = 'Sun';
    const search = await request.get(`/api/v1/search/${term}`).set('Authorization', token).catch((e) => e);
    expect(search.status).toBe(200);
    expect(search.body.tweetFound).toBe('no tweets found')
    expect(search.body.repliesFound).toBe('no replies found')

    done();
  });
});
