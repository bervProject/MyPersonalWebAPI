import app from '../../src/app';

describe("'blog' service", () => {
  it('registered the service', () => {
    const service = app.service('blog');
    expect(service).toBeTruthy();
  });
});
