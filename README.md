# Freedom Project Template

<!-- freedom-repository-guide:start -->
## 在自由工坊的位置

[自由工坊](https://freetwai.com) 讓會員先完成定位、選擇公會並領取 Repo 技能書，再以供貨、商店、開源作品、行銷與小隊共同完成成果。

建立獨立新專案的 Node 24 範本。 已有本機 HTTP preview、原生測試、可重現 build、GitHub 任務表單與 pinned 契約。

新建專案仍須設定自己的 repo 身分；模板不自動建立雲端服務、登入、付款或正式資格。

本 repo 的維護者負責「建立獨立新專案的 Node 24 範本。」這個模組；公會職稱與自填 GitHub slug 不授予寫入權。

程式／內容入口：[src/server.mjs](src/server.mjs)、[scripts/build.mjs](scripts/build.mjs)、[test/](test/)、[docs/initialize-project.md](docs/initialize-project.md)、[.github/ISSUE_TEMPLATE/](.github/ISSUE_TEMPLATE/)。協作先讀 [CONTRIBUTING.md](CONTRIBUTING.md)，讓 Agent 讀 [AGENTS.md](AGENTS.md)；從[本倉 Issues](https://github.com/FreeTWAI/freedom-project-template/issues)認領、[查看既有 PR](https://github.com/FreeTWAI/freedom-project-template/pulls)避免重工。

從模板建立的 repo 不等於 GitHub fork，不繼承原 repo ID。新專案維護自己的產品碼；中央會員與公會仍經 freedom-platform API，不複製中央資料庫。 跨 repo 的協定由[中央平台](https://github.com/FreeTWAI/freedom-platform)維護。
<!-- freedom-repository-guide:end -->

A working Node 24 starting point for a **new independent project**, with tests, a local preview and a pinned Platform contract bundle. It does not copy the Platform's database or turn a new project into a Platform service.

```sh
npm test
npm run build
npm run dev
```

Open `http://127.0.0.1:4320` on the same machine. `PORT` can change the port; the example binds to loopback. This is not a remote deployment. `dist/server.mjs` is a reproducible source artifact.

## Create your project

After using the template, follow [the initialization checklist](docs/initialize-project.md). The checked-in `freedom.project.yaml` identifies **this template repository**. It must be replaced with the new repository's observed identity before the new project is registered. A template-created repository is not a GitHub fork, and does not inherit the source project's status.

Connect authenticated commands through `vendor/freedom-platform/client.mjs` using the pinned protocol. Session state is runtime input; never paste a Platform cookie, CSRF token, database URL or provider secret into the manifest, source or browser build. Shared identities, Guild memberships and transactions remain in `freedom-platform`.

This starter has no cloud deployment, public signup, payment, official-status verification or production approval. Source licensing is the repository owner's decision; this template does not invent a license grant for inherited code.

## Collaborate through one task record

Use this repository's [GitHub Issues](../../issues) to propose and coordinate work, then open a linked PR for review. [TASKS.md](TASKS.md) is the task entry point, [CONTRIBUTING.md](CONTRIBUTING.md) explains the human workflow, and [AGENTS.md](AGENTS.md) gives coding agents the same scope and validation rules. A fork preserves these instructions; maintainers still control assignment and repository permissions.
