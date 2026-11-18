# PETPET 大型寵物服務網

六角學院切版直播班第八週作業。依 Adobe XD 實作寵物服務搜尋、保姆詳情及三步驟預約，使用 Nuxt 4、Vue 3、TypeScript 和 Tailwind CSS 4。

[正式網站](https://hex-petpet.piafyoyo06.workers.dev/) · [Adobe XD 設計稿](https://xd.adobe.com/view/2c355bc0-1368-4995-b20d-9882992c75b0-7966/screen/69b72d39-0e8e-4849-96a2-617108c70de1/)

## 快速開始

建議使用 Node.js 24 LTS。其他支援版本列在 `package.json` 的 `engines`。Cloudflare Workers Builds 使用 Node.js 24。

```sh
npm ci
npm run dev
```

| 指令 | 用途 |
| --- | --- |
| `npm run typecheck` | 檢查 Vue 與 TypeScript 型別 |
| `npm run build` | 產生 Cloudflare Worker 與靜態資產 |
| `npm run preview` | 建置後，以 Wrangler 預覽實際 Worker |
| `npm run deploy` | 建置後，以已登入的 Wrangler 手動部署 |

GitHub `main` 已連至 Cloudflare Workers Builds。`main` 有新推送時，Cloudflare 會執行型別檢查、建置並部署 `hex-petpet`。

## XD 畫板與體驗入口

以 1280、768、375 px 分別對照桌機、平板、手機。28 張頁面與互動畫板有以下對應入口，另 1 張 UI Kit 的規格整理在 Tailwind 主題與共用元件中。

| 畫板 | 入口 |
| --- | --- |
| 首頁與服務列表 | `/` 與 `/services` |
| 毛孩好家詳情 | `/sitters/good-home` |
| 三步驟預約與成功頁 | 在保姆詳情選「立刻預約」 |
| 登入與會員中心 | `/login` 與 `/member` |
| 手機主選單 | 在手機尺寸開啟頁首選單 |

搜尋與篩選使用示範資料，頁數依符合條件的資料計算。登入、第三方登入按鈕、服務預約、付款及支援表單均為前端示範。請使用測試資料。預約記錄保存在當前分頁的工作階段。XD 未繪製的連結使用占位頁，入口旁有程式碼註解。

## 專案結構

- `app/pages` 負責路由及各頁的內容組合。
- `app/components` 放共用導覽、服務卡片、日期欄位、表單及預約視窗。
- `app/composables` 集中處理預約選擇、會員狀態及預約記錄。
- `app/data/petpet.ts` 放服務、保姆及評論的示範資料。
- `app/assets/css/main.css` 使用 Tailwind `@theme` 定義色彩、字型、斷點、間距、圓角與陰影。
- `app/plugins` 處理瀏覽器內的示範記錄與捲動動畫。動畫尊重系統的減少動態效果設定。
- `public/petpet` 放六角學院課程素材與 XD 插圖。照片使用 WebP，保留設計稿的原始裁切比例。

[六角學院課程素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-petpet)
