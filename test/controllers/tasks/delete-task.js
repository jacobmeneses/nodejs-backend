const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe('Delete task', () => {
  const taskId = 5;
  const taskId2 = 6;

  it('should get unauthorized', async () => {
    const response = await client.deleteTask('wrongtoken', taskId);
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should return error when id is not found', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.deleteTask(b.token, 9999999);
    const body = await response.json();

    assert.equal(response.status, 500);
  });

  it('should return error when tasks is not owned by user', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.deleteTask(b.token, taskId2);
    const body = await response.json();

    assert.equal(response.status, 500);
  });

  it('should delete task', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.deleteTask(b.token, taskId);
    const body = await response.json();

    assert.equal(response.status, 200);
  });
});
