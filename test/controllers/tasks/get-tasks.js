const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe.only('Get tasks', () => {
  it('should get unauthorized', async () => {
    const response = await client.getTasks('wrongtoken');
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should get tasks', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.getTasks(b.token);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert(Array.isArray(body.tasks));
    assert(body.tasks.length > 0);

    for (const task of body.tasks) {
      console.log(task)
      assert(typeof task.createdBy === 'number');
      assert(task.createdBy === b.id);
    }
  });
});
