const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe('Get tasks', () => {
  const sprintId = 1;

  it('should get unauthorized', async () => {
    const response = await client.getTasks('wrongtoken', sprintId);
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should get tasks of given sprint', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.getTasks(b.token, sprintId);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert(Array.isArray(body.tasks));
    assert(body.tasks.length > 0);
    assert(typeof body.sprint.id === 'number');

    // console.log(body.tasks);

    for (const task of body.tasks) {
      assert(typeof task.createdBy === 'number');
      assert(task.createdBy === b.id);
      assert(task.sprintId === sprintId);
    }
  });

  it('should get tasks no assigned to sprint', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.getTasks(b.token, null);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert(Array.isArray(body.tasks));
    assert(body.tasks.length > 0);
    assert(typeof body.sprint.id === 'undefined');

    for (const task of body.tasks) {
      assert(typeof task.createdBy === 'number');
      assert(task.createdBy === b.id);
      assert(task.sprintId === null);
    }
  });
});
