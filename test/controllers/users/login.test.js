const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe('Login', () => {
  it('should not login', async () => {
    const response = await client.login(email, 'wrongpassword');
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should not found user', async () => {
    const response = await client.login('wrong@example.com', 'wrongpassword');
    const body = await response.json();

    assert.equal(response.status, 404);
  });

  it('should login', async () => {
    const response = await client.login(email, password);
    const body = await response.json();

    assert.equal(response.status, 200);
  });
});
