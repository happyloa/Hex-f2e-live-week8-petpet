# PETPET 大型寵物服務網

六角學院第八週切版作業，使用 Nuxt 4、Vue 3、TypeScript 與 Tailwind CSS 4。

[正式網站](https://hex-petpet.piafyoyo06.workers.dev/) · [Adobe XD 設計稿](https://xd.adobe.com/view/2c355bc0-1368-4995-b20d-9882992c75b0-7966/screen/69b72d39-0e8e-4849-96a2-617108c70de1/) · [課程素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-petpet)

## 本機開發

建議使用 Node.js 24 LTS（24.15.0 起）。

```sh
npm ci
npm run dev
```

`npm run typecheck` 檢查型別，`npm run build` 建置 Worker，`npm run preview` 預覽建置結果。

## 主要頁面

- 服務搜尋 `/services`
- 保姆詳情與預約 `/sitters/good-home`
- 登入與會員中心 `/login`、`/member`
- 成為寵物保姆 `/info/join`
- 使用條款與隱私政策 `/info/terms`、`/info/privacy`

登入、預約、付款及支援表單為前端示範，請使用測試資料。預約紀錄存在目前分頁。

## 部署

推送 `main` 後，Cloudflare Workers Builds 會檢查型別、建置並部署。也可在完成建置後執行 `npm run deploy` 手動部署。
