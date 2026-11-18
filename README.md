# PETPET 大型寵物服務網

六角學院切版直播班第八週切版作業。依 Adobe XD 畫板實作首頁、服務列表、保姆詳情、三步驟預約、登入及會員頁。網站使用繁體中文，支援桌機、平板與手機。

## 本機開發

使用 Node.js 22.22.3／24.15.0 以上的 LTS 小版本，或 Node.js 26。

```sh
npm ci
npm run dev
```

`npm run typecheck` 檢查型別，`npm run build` 產生 Cloudflare Worker 與靜態資產。登入 Cloudflare 後可先用 `npm run preview` 驗證 Worker，並以 `npm run deploy` 部署。

## 專案結構

- `app/pages` 是頁面路由，串接各頁的版型。
- `app/components` 是共用的導覽、卡片、預約表單及主要內容區塊。
- `app/composables` 管理示範會員及預約狀態。
- `app/assets/css/main.css` 在 Tailwind CSS 的 `@theme` 定義色彩、字型、斷點、間距、圓角與陰影。版面樣式依使用範圍放在元件內，按鈕和欄位共用同一組樣式。
- `public/petpet` 放六角學院提供的課程圖檔及 XD 的插圖。

日期元件使用 Vue Datepicker，由 Tailwind 主題供應配色、字型與欄位尺寸。XD 未提供畫板的連結使用預留頁面，入口旁有程式碼註解。

搜尋與篩選使用本機示範資料。登入、預約及付款為前端操作示範。請使用測試資料。預約記錄保存在當前分頁的工作階段。

## 設計與素材

- [Adobe XD 設計稿](https://xd.adobe.com/view/2c355bc0-1368-4995-b20d-9882992c75b0-7966/screen/69b72d39-0e8e-4849-96a2-617108c70de1/)
- [六角學院課程素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-petpet)
