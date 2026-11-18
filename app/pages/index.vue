<script setup lang="ts">
definePageMeta({ showFooter: true })
useHead({ title: '寵物服務，盡在 PETPET', titleTemplate: '%s' })
const featuredCopy = '即時瞭解您的需求，安排最適合毛孩的寵物保姆！'
</script>

<template>
  <HomeHero />
  <div class="grid gap-10 pt-[56px] pb-[60px] tablet:gap-16 tablet:pt-[52px] tablet:pb-[60px] desktop:gap-section desktop:pt-section desktop:pb-section">
    <FeaturedSitters title="本月熱門保姆" :subtitle="featuredCopy" />
    <ServiceTiles />
    <PetpetStats />
    <BookingGuide />
  </div>
</template>
