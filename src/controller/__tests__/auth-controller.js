import AuthController from '../auth-controller';

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
});
