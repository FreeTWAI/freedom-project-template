# 一起把專案做好

任務與進度以本 repo 的 [GitHub Issues](../../issues) 為準；程式修改與審查以 PR 為準。自由工坊的共創頁協助大家找到專案、角色和任務入口，repo 權限仍由維護者管理。

## 從一張明確的 Issue 開始

在 [任務表單](../../issues/new?template=task.yml) 說清楚：誰遇到什麼問題、這輪範圍、完成條件、怎麼驗證、需要哪些角色，以及依賴的資料或其他任務。可以從開發、測試、設計、文件、行銷、銷售或營運切入；一張 Issue 不必同時需要全部角色。

認領前，先讀 Issue 的最新討論與 [AGENTS.md](AGENTS.md)。在 Issue 留言說明你想處理的範圍、預計交付、需要的協助和可投入時間，等維護者確認後再視為已分派。維護者已直接授權的工作沿用該授權，並把範圍連回 Issue，避免其他人重複實作。

## 使用自己的分支交付

1. 使用自己的 fork，或維護者已授權的 repo 工作分支。
2. 每張任務建立獨立分支，保持修改在約定範圍內。
3. 保留現有作者、來源和授權資訊；不要提交客戶私密素材、登入憑證或 API key。
4. 按完成條件驗證成果，開 PR 並連回 Issue。PR 送審不代表已完成驗收或合併。

使用 AI 協作時，請把 Issue 與本 repo 的操作說明一起交給工具；檢查它實際修改的內容與測試結果，並在 PR 註明工具和協作範圍。

## 本模板的檢查方式

使用 Node.js 24，先讀 `package.json`。目前的本機命令是：

```sh
npm test
npm run build
```

需要查看畫面時，執行 `npm run dev`，在同一台機器打開 `http://127.0.0.1:4320`。這是本機預覽，並未對外部署。新的產品功能應依自身行為增加有意義的驗證；文件任務可以提供實際連結和步驟核對結果。PR 如實列出執行過、未執行與失敗的項目。

新建獨立專案後，先完成 [初始化清單](docs/initialize-project.md)，使用自己的 repo 身分；不要把模板的 manifest 或官方狀態當成自己的。

## 署名、審查與合作條件

在 PR 說明誰實際做了設計、程式、測試、文件或其他工作，附上對應成果。需要使用 `Co-authored-by` 時，先確認對方同意且確有參與；不要填造假名字或把平台中未驗證的 GitHub slug 當成已驗證作者。

維護者負責審查、合併與發布。這是自願開源共創，不保證收入、職位或接案；若有付費合作，請由當事人另外確認範圍、交付和費用。

<!-- freedom-repository-guide:start -->
## 自由工坊：從一個成果到一個 PR

建立獨立新專案的 Node 24 範本。 已有本機 HTTP preview、原生測試、可重現 build、GitHub 任務表單與 pinned 契約。

先看[本倉 Issues](https://github.com/FreeTWAI/freedom-project-template/issues)與[現有 PR](https://github.com/FreeTWAI/freedom-project-template/pulls)。提出問題、這一輪範圍、完成條件與可投入時間，在 Issue 認領並協調重疊工作；維護者已直接派工時不必重複等待，將約定連回交接即可。使用自己的 fork／分支，PR 送到 **FreeTWAI/freedom-project-template:main**。

交給 Agent 前先讓它讀 [AGENTS.md](AGENTS.md)。PR 寫明變更用途、使用者可見結果、驗證命令、限制與原 Issue；附上可公開的合成案例或重現方式。Issue／PR 是程式協作的記錄，平台名片與公會身分不取代 repo 維護者的審查。

從模板建立的 repo 不等於 GitHub fork，不繼承原 repo ID。新專案維護自己的產品碼；中央會員與公會仍經 freedom-platform API，不複製中央資料庫。

### 這個模組怎麼驗證

選擇與修改範圍相符的既有入口：

```sh
npm test
npm run build
```

命令列在這裡不表示本輪已執行。先核對依賴與環境，再記錄實際結果；缺工具、桌面、媒體或授權時寫 `not_run` 與原因，不能補造成功。純文件修改以連結／路徑核對與 `git diff --check` 為主。

### 署名與上游

本 repo 的維護者負責「建立獨立新專案的 Node 24 範本。」這個模組；公會職稱與自填 GitHub slug 不授予寫入權。 保留原作者與授權檔，另列真正完成文件、測試、設計、程式或協作的人。使用 AI 時如實交代協作範圍；只有實際 GitHub PR／review／合併紀錄可以作為對應貢獻證據，不能靠自填帳號推定。

自願貢獻不保證案源、XP、收益或雇用。若產生付費合作，由當事人另定條款與 Seller 外部收款；平台不代收。秘密、客戶資料、真實交易單據與未授權素材不進公開 Issue／PR。
<!-- freedom-repository-guide:end -->
