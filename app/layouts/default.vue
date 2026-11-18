<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>

<template>
  <div>
    <a v-if="!mobileMenuOpen" href="#main-content" class="skip-link">跳到主要內容</a>
    <SiteHeader v-model:menu-open="mobileMenuOpen" />
    <main id="main-content" class="min-h-[calc(100svh-62px)] tablet:min-h-[calc(100svh-64px)]" :inert="mobileMenuOpen">
      <slot />
    </main>
    <div :inert="mobileMenuOpen">
      <SiteFooter />
    </div>
    <BookingDialog />
  </div>
</template>
