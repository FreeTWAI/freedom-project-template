# Initialize a new independent project

## Template Usage and Scaffolding Options

This repository serves as a starting point for creating new independent projects. When you create a new repository from this template, you'll receive a pre-configured project structure that includes a local preview server, automated test setup, and build scripts.

The essential files and directories scaffolded include:
- `src/`: Contains the application source code (e.g., `server.mjs`).
- `scripts/`: Holds build scripts (e.g., `build.mjs`).
- `test/`: Contains test files leveraging the native Node.js test runner.
- `docs/`: Includes initialization instructions and project documentation.
- `.github/workflows/`: Pre-configured GitHub Actions CI workflow for verifying contract and behavior.

You are encouraged to build upon this scaffold by replacing the default application logic in `src/server.mjs` with your project's unique features.

## Initialization Checklist

1. Create the new repository from the template and read its real GitHub API identity. Record its stable repository ID, full name, visibility, owner and default branch.
2. Choose a new `project_id` and slug. Replace this template's name, audience, capabilities, limitations and ownership with the new project's facts.
3. Set `repository.creation_method: template`, `repository.is_fork: false`, `repository.upstream: null`. Record the source template's repository ID and full immutable commit under `source_lineage` with `relation: template_source`. Preserve source notices and confirm the source license; do not assert a grant that does not exist.
4. Configure the data boundary. Private source stays `platform_only` or `withheld`; it must not be fed into a public page build. Source visibility is not authority to publish customer data.
5. Start deployment environments with `provider: none`. A source artifact or green test is not a deployment or production release. Set intended Pages metadata only for public project introduction pages; Pages never hosts member credentials or transactions.
6. Validate `freedom.project.yaml` against the **pinned canonical schema**, then run GitHub semantic consistency checks. Do not modify a vendored schema to make an invalid manifest pass. The manifest can use JSON serialization because JSON is valid YAML.
7. Replace the local preview with one useful project feature and test it. Do not execute arbitrary shell commands supplied by a manifest. Build profiles/workflows are reviewed source code.
8. Register via `freedom-skill-registry` and the canonical Platform API when the maintainer is ready to share. Use the maintainer's actual relationship and explicit consent; an import does not grant official status or Skill execution capability.

## Configuration Presets

This template includes a few predefined configuration presets:
- **Node.js Engine**: Requires Node.js version 24 (`>=24 <25`) as specified in `package.json`.
- **Module Type**: Uses ECMAScript modules (`"type": "module"` in `package.json`).
- **Manifest**: Includes a `freedom.project.yaml` manifest that defines the initial metadata. This will be customized as per step 2 in the initialization checklist.

## Automated Test Setup and CI setup

The project comes with a built-in test framework and continuous integration pipeline:

- **Local Tests**: Tests are written using the native Node.js test runner (`node:test`). You can execute them by running `npm test`. Test files should be placed inside the `test/` directory.
- **Continuous Integration**: The repository is set up with GitHub Actions CI out-of-the-box. The workflow `.github/workflows/verify.yml` runs automatically on pull requests and pushes to the `main` branch. This workflow verifies the project template contract and expected behaviors without needing additional setup.

The SDK and manifests pin one contract bundle shared with the other Freedom repositories. Upgrade the bundle as a coordinated compatibility change, keeping its source commit and file digests; test the consumer against the canonical API before deploying.
