import { Server } from 'http';
import axios from 'axios';

import app from '../src/app';

const port = app.get('port') || 8998;
const getUrl = (pathname?: string) => {
  const url = new URL(`http://${app.get('host') || 'localhost'}/`);
  url.pathname = pathname || '';
  url.port = port;
  return url.href;
};

describe('Feathers application tests (with jest)', () => {
  let server: Server;

  beforeAll(async () => {
    server = await app.listen(port);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('starts and shows the index page', async () => {
    expect.assertions(1);

    const { data } = await axios.get(getUrl());

    expect(data.indexOf('<html lang="en">')).not.toBe(-1);
  });

  describe('404', () => {
    it('shows a 404 HTML page', async () => {
      expect.assertions(2);

      try {
        await axios.get(getUrl('path/to/nowhere'), {
          headers: {
            Accept: 'text/html',
            'Accept-Encoding': 'text/html; charset=UTF-8',
          },
          responseType: 'text',
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { response } = error;

          expect(response.status).toBe(404);
          expect(response.data.indexOf('<html>')).not.toBe(-1);
        }
      }
    });

    it('shows a 404 JSON error without stack trace', async () => {
      expect.assertions(4);

      try {
        await axios.get(getUrl('path/to/nowhere'));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { response } = error;
          expect(response.status).toBe(404);
          expect(response.data.code).toBe(404);
          expect(response.data.message).toBe('Page not found');
          expect(response.data.name).toBe('NotFound');
        }
      }
    });
  });
});
