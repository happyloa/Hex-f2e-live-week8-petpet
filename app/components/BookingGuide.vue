<script setup lang="ts">
import { asset } from '~/data/petpet'

const steps = [
  { name: '查詢想要的服務', image: 'booking-search.webp' },
  { name: '找到合適的保姆', image: 'booking-sitter.webp' },
  { name: '填寫資料完成預約', image: 'booking-form.webp' },
]
</script>

<template>
  <section class="site-container">
    <h2 class="text-heading font-bold">預約流程</h2>
    <p class="mt-1 text-label">輕鬆三步驟，立即獲取最佳服務！</p>
    <ol v-reveal class="mt-4 grid gap-8 tablet:mt-6 tablet:grid-cols-3 tablet:gap-gutter">
      <li v-for="(step, index) in steps" :key="step.name">
        <p class="mb-2 text-label">{{ index + 1 }}.{{ step.name }}</p>
        <img :src="asset(step.image)" alt="" loading="lazy"
          class="h-40 w-full bg-brand object-cover tablet:h-auto tablet:aspect-[210/99] desktop:aspect-[35/16]">
      </li>
    </ol>
  </section>
</template>
