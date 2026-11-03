import test from 'node:test';
import assert from 'node:assert/strict';
import { createPreviewServer } from '../src/server.mjs';
import http from 'node:http';

test('server performance benchmark', async (t) => {
  const server = createPreviewServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const origin = `http://127.0.0.1:${server.address().port}`;
  const agent = new http.Agent({ keepAlive: true });

  const iterations = 5000;
  let completed = 0;

  const start = performance.now();

  await new Promise((resolve, reject) => {
      const makeRequest = () => {
          http.get(origin, { agent }, (res) => {
              res.resume(); // drain
              res.on('end', () => {
                  completed++;
                  if (completed >= iterations) {
                      if (completed === iterations) resolve();
                  } else {
                      makeRequest();
                  }
              });
          }).on('error', reject);
      };
      // start 10 concurrent requests
      for (let i = 0; i < 10; i++) makeRequest();
  });

  const end = performance.now();
  const duration = end - start;

  const opsPerSec = (iterations / duration) * 1000;
  console.log(`Completed ${iterations} requests in ${duration.toFixed(2)}ms (${opsPerSec.toFixed(2)} req/sec)`);

  // ensure average latency is acceptable (expecting roughly > 2000 req/sec)
  assert.ok(opsPerSec > 1500, 'Server should handle at least 1500 req/sec');
});
