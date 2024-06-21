const { email, password, email2 } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe.only('Post Settings', () => {
  const newSettings = {
    key: 'board',
    values: {
      sprintId: 1,
    }
  };

  it('should get unauthorized', async () => {
    const response = await client.postSettings('wrongtoken', newSettings);
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should create settings', async () => {
    const r = await client.login(email2, password);
    const b = await r.json();

    const response = await client.postSettings(b.token, newSettings);
    const body = await response.json();

    assert.equal(response.status, 200);
  });

  it('should update settings', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    newSettings.values.sprintId = 2;

    const response = await client.postSettings(b.token, newSettings);
    const body = await response.json();

    assert.equal(response.status, 200);
  });
});

