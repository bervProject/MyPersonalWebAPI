import app from '../../src/app';

describe("'portofolio' service", () => {
  it('registered the service', () => {
    const service = app.service('portofolio');
    expect(service).toBeTruthy();
  });
});
