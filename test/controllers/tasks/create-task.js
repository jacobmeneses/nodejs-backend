const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe.only('Create task', () => {
  const columnId = 1;
  const title = 'testing create new task';

  it('should get unauthorized', async () => {
    const response = await client.moveTask('wrongtoken', { title, columnId });
    const body = await response.json();

    assert.equal(response.status, 401);
  });


  it('should return error when title is undefined', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.createTask(b.token, { title: undefined, columnId });
    const body = await response.json();

    assert.equal(response.status, 500);
  });

  it('should return error when columnId is undefined', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.createTask(b.token, { title, columnId: undefined });
    const body = await response.json();

    assert.equal(response.status, 500);
  });

  it('should create task without sprint', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.createTask(b.token, { title, columnId });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.task.sprintId, null);
  });

  it('should create task with sprint', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.createTask(b.token, { title: 'test create task with sprint', columnId, sprintId: 1 });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.task.sprintId, 1);
  });
});
