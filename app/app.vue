<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <a href="#main-content" class="skip-link">跳到主要內容</a>
  <SiteHeader />
  <main id="main-content">
    <NuxtPage />
  </main>
  <SiteFooter v-if="route.meta.showFooter" />
  <BookingDialog />
</template>
