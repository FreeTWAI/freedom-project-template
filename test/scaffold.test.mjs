import test from 'node:test';
import assert from 'node:assert/strict';
import { access, constants } from 'node:fs/promises';
import { exec } from 'node:child_process';
import util from 'node:util';

const execAsync = util.promisify(exec);

test('the project template contains required configuration files', async () => {
  const requiredFiles = [
    'package.json',
    'freedom.project.yaml',
    '.gitignore',
    'README.md',
  ];

  for (const file of requiredFiles) {
    try {
      await access(new URL(`../${file}`, import.meta.url), constants.F_OK);
      assert.ok(true, `${file} exists`);
    } catch (err) {
      assert.fail(`Required file ${file} is missing: ${err.message}`);
    }
  }
});

test('the project builds cleanly and produces the expected output artifact', async () => {
  try {
    const { stdout, stderr } = await execAsync('npm run build');
    assert.match(stdout, /Built dist\/server\.mjs/);

    // Verify the output artifact exists
    await access(new URL('../dist/server.mjs', import.meta.url), constants.F_OK);
    assert.ok(true, 'dist/server.mjs exists');
  } catch (err) {
    assert.fail(`Build failed: ${err.message}`);
  }
});
