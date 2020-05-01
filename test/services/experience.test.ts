import app from '../../src/app';

describe('\'experience\' service', () => {
  it('registered the service', () => {
    const service = app.service('experience');
    expect(service).toBeTruthy();
  });
});
