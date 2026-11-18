import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-18',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: { deployConfig: true, nodeCompat: true },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant-TW' },
      titleTemplate: '%s｜PETPET',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/petpet/logo.svg' }],
      meta: [{ name: 'description', content: 'PETPET 寵物服務網。查找寵物寄宿、美容、到府照顧及遛狗保姆。' }],
    },
  },
})
