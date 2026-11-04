/**
 * Build Script
 *
 * This script serves as the build artifact generator for the project.
 * It is responsible for creating a reproducible source artifact (dist/server.mjs)
 * which can be used for deployments or packaging, without executing a remote deployment itself.
 *
 * Usage:
 *   node scripts/build.mjs
 *   (or via npm run build)
 */
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await copyFile(new URL('../src/server.mjs', import.meta.url), new URL('../dist/server.mjs', import.meta.url));
console.log('Built dist/server.mjs. No deployment performed.');
