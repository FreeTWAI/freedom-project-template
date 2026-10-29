import test from 'node:test';
import assert from 'node:assert/strict';
import { access, mkdtemp, rm, readFile, writeFile, cp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { exec } from 'node:child_process';
import util from 'node:util';
import { fileURLToPath } from 'node:url';

const execAsync = util.promisify(exec);
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

test('E2E: template scaffold generation and repo bootstrap', async (t) => {
    // 1. Create a temporary directory
    const tempDir = await mkdtemp(join(tmpdir(), 'freedom-template-e2e-'));

    try {
        // 2. Run npm pack to package the current repository
        const { stdout: packStdout } = await execAsync('npm pack --pack-destination ' + tempDir, { cwd: rootDir });
        const tarballName = packStdout.trim().split('\n').pop(); // Usually the last line is the filename
        const tarballPath = join(tempDir, tarballName);

        // Verify tarball exists
        await access(tarballPath);

        // 3. Extract the tarball
        const scaffoldDir = join(tempDir, 'scaffolded-project');
        await execAsync(`mkdir -p ${scaffoldDir}`);
        await execAsync(`tar -xzf ${tarballPath} -C ${scaffoldDir} --strip-components=1`);

        // Verify extraction
        await access(join(scaffoldDir, 'package.json'));
        await access(join(scaffoldDir, 'freedom.project.yaml'));

        // 4. Substitute variables in package.json and freedom.project.yaml
        const pkgPath = join(scaffoldDir, 'package.json');
        const pkgData = JSON.parse(await readFile(pkgPath, 'utf8'));
        pkgData.name = 'my-new-project';
        pkgData.version = '1.0.0';
        await writeFile(pkgPath, JSON.stringify(pkgData, null, 2), 'utf8');

        const configPath = join(scaffoldDir, 'freedom.project.yaml');
        let configData = await readFile(configPath, 'utf8');
        configData = configData.replace(/project_id: .*/, 'project_id: my-new-project-id');
        await writeFile(configPath, configData, 'utf8');

        // 5. Validate post-create validation hooks (run npm install and build)
        // Install dependencies if any (none required here typically but safe to run)
        await execAsync('npm install', { cwd: scaffoldDir });

        // Run tests
        const { stdout: testStdout } = await execAsync('npm test', { cwd: scaffoldDir });
        // Instead of matching 'pass', check that the command executed successfully.
        // `npm test` will output TAP information and exit with 0 on success.

        // Run build
        const { stdout: buildStdout } = await execAsync('npm run build', { cwd: scaffoldDir });
        assert.match(buildStdout, /Built dist\/server\.mjs/i, 'Build should succeed in the scaffolded project');

        // Verify artifact
        await access(join(scaffoldDir, 'dist/server.mjs'));

    } finally {
        // Cleanup
        await rm(tempDir, { recursive: true, force: true });
    }
});
