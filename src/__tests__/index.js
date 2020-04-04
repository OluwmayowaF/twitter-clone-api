/* eslint-disable no-undef */
const Helper = require('../utils/testHelper');

const helper = new Helper();


describe('Initial API test', () => {
  it('Should return a welcome response', async (done) => {
    const response = await helper.apiServer
      .get('/');
    expect(response.status).toBe(200);
    expect(response.res.text).toBe('Welcome to my Twitter Clone API');
    done();
  });
});
