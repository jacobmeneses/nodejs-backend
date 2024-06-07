const { email, password } = require('../../fixtures');
const assert = require('assert');
const client = require('../../client');

describe('Create sprint', () => {
  const startDate = new Date();
  const endDate = new Date(startDate);

  endDate.setDate(startDate.getDate() + 7);

  const request = {
    title: 'Sprint Mocha',
    startDate: startDate.toLocaleDateString('en-US'),
    endDate: endDate.toLocaleDateString('en-US'),
  };

  it('should get unauthorized', async () => {
    const response = await client.createSprint('wrongtoken', request);
    const body = await response.json();

    assert.equal(response.status, 401);
  });

  it('should not create sprint when one of the dates is missing', async () => {
    const r = await client.login(email, password);
    const b = await r.json();
    const _request = Object.assign({}, request);

    delete _request.startDate;

    const response = await client.createSprint(b.token, _request);
    const body = await response.json();

    assert.equal(response.status, 400);
  });

  it('should not create sprint if endDate > startDate', async () => {
    const r = await client.login(email, password);
    const b = await r.json();
    const _request = Object.assign({}, request);

    _request.endDate = new Date(startDate).toLocaleDateString('en-US');
    _request.startDate = new Date(endDate).toLocaleDateString('en-US');

    const response = await client.createSprint(b.token, _request);
    const body = await response.json();

    assert.equal(response.status, 400);
  });

  it('should create sprint', async () => {
    const r = await client.login(email, password);
    const b = await r.json();

    const response = await client.createSprint(b.token, request);
    const body = await response.json();

    assert.equal(response.status, 201);

    assert(body.id > 0);
    assert(body.title === body.title);
    assert(body.startDate === body.startDate);
    assert(body.endDate === body.endDate);
  });
});
