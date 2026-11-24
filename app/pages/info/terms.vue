<script setup lang="ts">
const title = '使用條款'
const summary = '了解 PETPET 示範網站提供的功能，以及使用預約、會員與聯絡功能時應注意的事項。'

useSeoMeta({ title, description: summary })

const sections = [
  {
    id: 'scope',
    title: '網站用途',
    paragraphs: [
      'PETPET 是六角學院切版練習，提供寵物服務搜尋、保姆介紹、會員及預約流程的操作體驗。頁面所列的保姆、評價、價格及服務資訊為示範內容。',
    ],
  },
  {
    id: 'accounts',
    title: '示範登入與會員資料',
    paragraphs: [
      '站內登入、Facebook 與 Google 登入按鈕、會員資料編輯均為示範功能。請使用測試資料，避免輸入真實密碼、付款資料或他人的個人資料。',
    ],
  },
  {
    id: 'bookings',
    title: '預約與付款',
    paragraphs: [
      '完成預約流程會在瀏覽器建立示範紀錄。會員頁可查詢及取消該分頁工作階段的紀錄。網站不會因此扣款、通知保姆或安排實際照護。',
    ],
  },
  {
    id: 'contact',
    title: '聯絡與加入',
    paragraphs: [
      '頁尾的支援表單用於展示操作流程。保姆加入頁提供電子郵件範本，您可在自己的郵件應用程式檢查收件地址與內容，再自行決定是否寄出。',
    ],
    link: { to: '/info/join', label: '成為寵物保姆' },
  },
  {
    id: 'materials',
    title: '網站素材',
    paragraphs: [
      '網站使用六角學院的課程素材。若要在其他地方重製或散布相關圖像及教材，請先向權利人確認可使用的範圍。',
    ],
  },
]
</script>

<template>
  <PolicyDocument :title="title" :summary="summary" updated="2026-11-24" :sections="sections"
    :related="{ to: '/info/privacy', label: '查看隱私政策' }" />
</template>
