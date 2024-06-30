const { email, password, email_without_settings } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe('Get user settings', () => {
  const query = { key: 'board' };

  it('should get unauthorized', async () => {
    const response = await client.getSettings('wrongtoken', query);
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should return not found', async () => {
    const r = await client.login(email_without_settings, password);
    const b = await r.json();

    const response = await client.getSettings(b.token, query);
    const body = await response.json();

    assert.equal(response.status, 404);
  });

  it('should get user settings', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.getSettings(b.token, query);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(typeof body.settings, 'object');
    assert.equal(typeof body.settings.sprintId, 'number');
  });
});
