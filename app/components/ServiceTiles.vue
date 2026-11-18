<script setup lang="ts">
import { asset, services } from '~/data/petpet'
</script>

<template>
  <section class="site-container">
    <h2 class="text-heading font-bold">線上預約</h2>
    <p class="mt-1 text-label">即時瞭解您的需求，安排最適合毛孩的寵物保姆！</p>
    <div class="service-tiles mt-3 grid gap-1 tablet:mt-4">
      <NuxtLink v-for="service in services" :key="service.id" :to="{ path: '/services', query: { service: service.id } }"
        class="group relative isolate grid min-h-[132px] place-items-center overflow-hidden rounded-ui text-lead font-bold text-white tablet:min-h-0">
        <img :src="asset(service.image)" alt="" loading="lazy"
          class="absolute inset-0 -z-20 size-full object-cover transition-transform duration-300 group-hover:scale-105">
        <span class="absolute inset-0 -z-10 bg-black/45 transition-colors group-hover:bg-black/60" aria-hidden="true" />
        {{ service.name }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
@media (width >= 48rem) {
  .service-tiles {
    grid-template-columns: 350fr 303fr 267fr 210fr;
    grid-template-rows: repeat(2, 1fr);
    height: 210px;
  }
  a:nth-child(1), a:nth-child(2), a:nth-child(5) { grid-row: span 2; }
  a:nth-child(4) { grid-column: 3; }
  a:nth-child(5) { grid-column: 4; grid-row: 1 / span 2; }
}

@media (width >= 64rem) {
  .service-tiles { grid-template-columns: 350fr 303fr 267fr 172fr; gap: 6px; height: 350px; }
}
</style>
