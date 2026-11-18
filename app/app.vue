<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)
</script>
<template>
  <a v-if="!mobileMenuOpen" href="#main-content" class="skip-link">跳到主要內容</a>
  <SiteHeader v-model:menu-open="mobileMenuOpen" />
  <main id="main-content" :inert="mobileMenuOpen">
    <NuxtPage />
  </main>
  <div v-if="route.meta.showFooter" :inert="mobileMenuOpen">
    <SiteFooter />
  </div>
  <BookingDialog />
</template>
