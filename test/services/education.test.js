const assert = require('assert');
const app = require('../../src/app');

describe('\'education\' service', () => {
  it('registered the service', () => {
    const service = app.service('education');

    assert.ok(service, 'Registered the service');
  });
});
