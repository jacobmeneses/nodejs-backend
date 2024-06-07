const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe.only('Get sprints', () => {
  it('should get unauthorized', async () => {
    const response = await client.getSprints('wrongtoken');
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should get sprints', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.getSprints(b.token);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert(Array.isArray(body.sprints));
    assert(body.sprints.length > 0);
  });
});
