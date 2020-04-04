/* eslint-disable no-undef */
const {
  validPassword, validEmail, hashPassword, comparePassword, generateToken, verifyToken,
} = require('../auth');

let hashedPassword;
const id = 5;
let token;

describe('Test Valid Password', () => {
  test('Valid Password Function returns false for no password', () => {
    const response = validPassword('');
    expect(response).toBe(false);
  });
  test('Valid Password Function returns false for short password', () => {
    const response = validPassword('abc');
    expect(response).toBe(false);
  });
  test('Valid Password Function returns true for correct password', () => {
    const response = validPassword('password');
    expect(response).toBe(true);
  });
});

describe('Test Valid Email', () => {
  test('Valid Password Function returns false for no email entered', () => {
    const response = validEmail('');
    expect(response).toBe(false);
  });
  test('Valid Password Function returns false for incorrect email structure', () => {
    const response = validEmail('amail.com');
    expect(response).toBe(false);
  });
  test('Valid Password Function returns true for correct email', () => {
    const response = validEmail('e_fadairo@yahoo.com');
    expect(response).toBe(true);
  });
});

describe('Test Password Hashed Correctly ', () => {
  test('Test that the hashpasssword function returns a string different from password', () => {
    const password = 'grapefruit';
    const response = hashPassword(password);
    hashedPassword = response;
    expect(response).not.toBe(password);
  });
});

describe('Test Password comparison is Correct', () => {
  test('Test that the password is decoded and comparison is accurate', () => {
    const password = 'grapefruit';
    const response = comparePassword(hashedPassword, password);
    expect(response).toBe(true);
  });
  test('The comparison is false when a different password is used to compare', () => {
    const password = 'grapefruits';
    const response = comparePassword(hashedPassword, password);
    expect(response).toBe(false);
  });
});

describe('Token Generation works properly', () => {
  test('Test that a token string is generated', () => {
    const response = generateToken(id);
    token = response;
    expect(response.length).toBeGreaterThan(1);
    expect(typeof response).toBe('string');
  });
});

describe('Token Verification works properly and userId is returned', () => {
  test('Test that a token string is generated', () => {
    const response = verifyToken(token);
    expect(response.userId).toBe(id);
    expect(typeof response).toBe('object');
  });
});
