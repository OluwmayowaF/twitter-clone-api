const supertest = require('supertest');
const app = require('../index');

class Helper {
  constructor(model) {
    this.apiServer = supertest(app);
    this.urlPrefix = '/api/v1/';
  }
}

module.exports = Helper;
