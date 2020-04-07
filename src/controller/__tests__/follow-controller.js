/* eslint-disable no-undef */
import Server from '../../server';

process.env.NODE_ENV = 'test';
let app;

require('dotenv').config();
const supertest = require('supertest');

let request;

const { closeDatabase } = require('../../utils/testdbhandler');

let token1;
let userId1;
let token2;
let userId2;

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

describe('Test Follow a user ', () => {
  test('Test users cannot  follow self', async (done) => {
    await request.post('/api/v1/users').send({
      username: 'Sunny',
      password: 'sunny123456',
      email: 'gabby@saules.com',
    }).catch((e) => e);
    await request.post('/api/v1/users').send({
      username: 'Mason',
      password: 'sunny123456',
      email: 'gabby@mason.com',
    }).catch((e) => e);


    const testUser1 = await request.post('/api/v1/users/login').send({
      username: 'Sunny',
      password: 'sunny123456',
    }).catch((e) => e);

    token1 = testUser1.body.token;
    userId1 = testUser1.body.user._id;
    
    const testUser2 = await request.post('/api/v1/users/login').send({
      username: 'Mason',
      password: 'sunny123456',
    }).catch((e) => e);

    token2 = testUser2.body.token;
    userId2= testUser2.body.user._id;

    const tweet = await request.post('/api/v1/tweets').send({
      tweet: 'It wasnt me ooh',
    }).set('Authorization', token2).catch((e) => e);

    const followUser = await request.post(`/api/v1/follow/${userId2}`)
      .set('Authorization', token2).catch((e) => e);
    expect(followUser.status).toBe(400);
    done();
  });
  test('Test users cannot  follow self', async (done) => {
    const followUser = await request.post(`/api/v1/follow/${userId2}`)
      .set('Authorization', token1).catch((e) => e);
    expect(followUser.status).toBe(200);
    done();
  });
  test('Test get followers', async (done) => {
    const followers = await request.get(`/api/v1/followers/${userId2}`)
      .set('Authorization', token1).catch((e) => e);
    expect(followers.status).toBe(200);
    done();
  });
  test('Test get following', async (done) => {
    const following = await request.get(`/api/v1/following/${userId1}`)
      .set('Authorization', token1).catch((e) => e);
    expect(following.status).toBe(200);
    done();
  });
  test('Cannot follow a user that doesnt exist', async (done) => {
    const deletedUser = '5e8c3017b9834ca8857fafa3';
    const following = await request.get(`/api/v1/follow/${deletedUser}`)
      .set('Authorization', token1).catch((e) => e);
    expect(following.status).toBe(404);
    done();
  });
});
