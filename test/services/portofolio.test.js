const assert = require('assert');
const app = require('../../src/app');

describe('\'portofolio\' service', () => {
  it('registered the service', () => {
    const service = app.service('portofolio');

    assert.ok(service, 'Registered the service');
  });
});
