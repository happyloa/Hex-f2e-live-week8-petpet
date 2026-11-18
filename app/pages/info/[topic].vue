<script setup lang="ts">
const route = useRoute()
const titles = {
  app: '專屬 APP 下載',
  history: '歷史預約',
  join: '成為寵物保姆',
  password: '忘記密碼',
  privacy: '隱私政策',
  register: '註冊',
  taxi: '加入寵物計程車',
  terms: '使用條款',
}
const title = computed(() => titles[route.params.topic as keyof typeof titles])
if (!title.value) throw createError({ statusCode: 404, statusMessage: '找不到這個頁面' })
useHead({ title })
</script>

<template>
  <section class="site-container py-section">
    <h1 class="text-heading font-bold">{{ title }}</h1>
    <p class="mt-5 text-label">此頁為連結預留。</p>
    <NuxtLink to="/" class="button button-primary mt-8">回到首頁</NuxtLink>
  </section>
</template>
