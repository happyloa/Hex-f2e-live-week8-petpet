<script setup lang="ts">
const title = '隱私政策'
const summary = '了解 PETPET 示範網站如何使用瀏覽器儲存、處理連線請求，以及如何清除本機資料。'

useSeoMeta({ title, description: summary })

const sections = [
  {
    id: 'demo-forms',
    title: '示範表單',
    paragraphs: [
      '登入、會員資料編輯、預約、付款與頁尾支援表單均在瀏覽器內處理。這些示範功能不會將表單內容傳送至網站伺服器。請使用測試資料。',
    ],
  },
  {
    id: 'browser-storage',
    title: '瀏覽器儲存',
    paragraphs: [
      '勾選「記住我的帳號」時，網站會在本機儲存示範登入狀態。這項設定不包含您輸入的電子信箱或密碼。',
      '示範預約的識別碼、保姆、服務、日期、寵物名稱與數量會儲存在該分頁的工作階段，供會員頁查詢。示範會員資料的編輯保留在目前載入的網站中，重新整理頁面後會還原。',
    ],
  },
  {
    id: 'hosting',
    title: '網站託管與日誌',
    paragraphs: [
      '本網站透過 Cloudflare Workers 提供頁面與資源。Cloudflare 在提供網站時可能處理 IP 位址等連線資料。為維護網站和排查錯誤，Workers 日誌可能記錄請求網址、方法、時間與回應狀態。日誌保留期間及儲存地區依 Cloudflare 方案與設定而定。',
    ],
    link: { to: 'https://www.cloudflare.com/privacypolicy/', label: 'Cloudflare 隱私政策' },
  },
  {
    id: 'email',
    title: '電子郵件聯絡',
    paragraphs: [
      '電子郵件連結會開啟您的郵件應用程式。若您自行寄出郵件，您的郵件服務商及收件方會處理寄件地址與您提供的信件內容。請避免在信件中提供與詢問無關的個人資料。',
    ],
  },
  {
    id: 'data-controls',
    title: '資料管理與聯絡',
    paragraphs: [
      '登出會清除記住登入的設定。您可在會員頁取消示範預約，也可在瀏覽器設定中清除本網站的資料，以移除本機儲存與工作階段紀錄。若有隱私問題，或希望依適用法令查詢、更正或刪除個人資料，可透過下方信箱聯絡。',
    ],
    link: { to: 'mailto:petpet@petmail.com', label: 'petpet@petmail.com' },
  },
]
</script>

<template>
  <PolicyDocument :title="title" :summary="summary" updated="2026-11-24" :sections="sections"
    :related="{ to: '/info/terms', label: '查看使用條款' }" />
</template>
