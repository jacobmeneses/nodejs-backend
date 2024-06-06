const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe('Move task', () => {
  const taskId = 4;
  const newColumnId = 2;
  const sprintId = 1;

  it('should get unauthorized', async () => {
    const response = await client.moveTask('wrongtoken', newColumnId, taskId);
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should return not found', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.moveTask(b.token, newColumnId, 9999999);
    const body = await response.json();

    assert.equal(response.status, 404);
  });

  it('should move task', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.moveTask(b.token, newColumnId, taskId);
    const body = await response.json();

    assert.equal(response.status, 200);
    const r2 = await client.getTasks(b.token, sprintId);
    const b2 = await r2.json();
    const task = b2.tasks.find((t) => t.id === taskId);

    assert.equal(task.columnId, newColumnId);
  });
});
