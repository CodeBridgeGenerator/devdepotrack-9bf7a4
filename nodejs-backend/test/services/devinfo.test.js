const assert = require('assert');
const app = require('../../src/app');

describe('\'devinfo\' service', () => {
  it('registered the service', () => {
    const service = app.service('devinfo');

    assert.ok(service, 'Registered the service (devinfo)');
  });
});
