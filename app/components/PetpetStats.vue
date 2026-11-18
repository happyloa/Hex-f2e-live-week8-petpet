<script setup lang="ts">
const metrics = [{ value: '5278', label: '人使用 PETPET' }, { value: '580', label: '人成為寵物保母' }, { value: '10000+', label: '已完成服務' }]
</script>

<template>
  <section id="about" class="stats min-h-[812px] bg-ink bg-cover bg-center text-white tablet:min-h-[584px]">
    <div class="site-container pt-[60px] tablet:pt-section">
      <h2 class="text-center text-display font-bold tablet:text-left">PETPET目前已有</h2>
      <dl v-reveal class="mt-12 ml-[26%] grid gap-y-section tablet:mt-24 tablet:ml-0 tablet:grid-cols-3 tablet:gap-x-gutter desktop:w-[75%]">
        <div v-for="metric in metrics" :key="metric.label"
          class="flex min-h-[120px] flex-col-reverse justify-end border-l-2 border-white pl-4 tablet:min-h-[212px]">
          <dt class="text-label">{{ metric.label }}</dt>
          <dd class="text-[48px] leading-[1.5] font-bold">{{ metric.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.stats {
  background-image: url('/petpet/index-9.webp');
  background-position: calc(50% - 28px) center;
}

@media (width >= 48rem) {
  .stats {
    background-size: max(115.5%, 1002px) auto;
    background-position: calc(50% + clamp(70px, 7.1vw, 140px)) calc(50% - 16px);
  }
}
</style>
