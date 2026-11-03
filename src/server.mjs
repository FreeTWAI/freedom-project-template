import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ESCAPE_MAP[character]);

/** Local preview only. Add real product behavior without creating a second member database. */
export function createPreviewServer({ projectName = 'New Freedom project' } = {}) {
  if (typeof projectName !== 'string' || !projectName.trim() || projectName.length > 120) throw new TypeError('Project name must be 1–120 characters');
  const escapedName = escapeHtml(projectName);
  const htmlResponse = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapedName}</title><style>body{font:18px system-ui;max-width:48rem;margin:4rem auto;padding:0 1.5rem;color:#16342f;background:#f7fbf9}h1{font-size:2.4rem}code{background:#e5eee9;padding:.15rem .4rem}</style><main><p>Freedom project starter · local preview</p><h1>${escapedName}</h1><p>Your project has a working Node 24 starting point.</p><ol><li>Set the project's real repository identity and owner in <code>freedom.project.yaml</code>.</li><li>Build a small useful feature and verify it with a test.</li><li>Connect through the pinned Platform client when your feature needs shared member or project state.</li></ol><p>No membership, commerce, cloud deployment or official status is implied by this preview.</p></main></html>`;
  const healthResponse = JSON.stringify({ status: 'ok', mode: 'local-template-preview' });
  return createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end('Method not allowed');
      return;
    }
    const path = request.url?.split('?')[0];
    if (path === '/health') {
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(healthResponse);
      return;
    }
    if (path !== '/') {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(htmlResponse);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? '4320');
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new TypeError('PORT must be 1024–65535');
  createPreviewServer().listen(port, '127.0.0.1', () => console.log(`Local template preview: http://127.0.0.1:${port}`));
}
