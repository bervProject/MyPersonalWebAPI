const assert = require('assert');
const app = require('../../src/app');

describe('\'experience\' service', () => {
  it('registered the service', () => {
    const service = app.service('experience');

    assert.ok(service, 'Registered the service');
  });
});
