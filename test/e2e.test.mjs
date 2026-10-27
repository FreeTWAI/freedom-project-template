import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

test('template expansion variables', async () => {
    const pkgPath = join(rootDir, 'package.json');
    const pkgData = JSON.parse(await readFile(pkgPath, 'utf8'));
    assert.ok(pkgData.name, 'package.json must have a name field');
    assert.ok(pkgData.version, 'package.json must have a version field');
    assert.strictEqual(pkgData.type, 'module', 'package.json must be type module');
});

test('directory scaffolding integrity', async () => {
    const requiredDirs = ['src', 'scripts', 'test', 'docs', '.github'];
    for (const dir of requiredDirs) {
        try {
            await access(join(rootDir, dir));
            assert.ok(true, `${dir} directory exists`);
        } catch (e) {
            assert.fail(`${dir} directory does not exist: ${e.message}`);
        }
    }
});

test('config schema validation', async () => {
    const configPath = join(rootDir, 'freedom.project.yaml');
    const configData = await readFile(configPath, 'utf8');
    assert.match(configData, /"schema_version":/, 'Config must have a schema_version');
    assert.match(configData, /"project_id":/, 'Config must have a project_id');
    assert.match(configData, /"kind":\s*"Project"/, 'Config must be of kind Project');
});
