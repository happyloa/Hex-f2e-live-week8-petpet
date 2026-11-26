<script setup lang="ts">
import { cities, petTypes, services } from '~/data/petpet'

const pet = ref('')
const service = ref('')
const city = ref('')

function search() {
  return navigateTo({ path: '/services', query: {
    ...(pet.value && { pet: pet.value }),
    ...(service.value && { service: service.value }),
    ...(city.value && { city: city.value }),
  } })
}
</script>

<template>
  <form action="/services" method="get" class="grid gap-4 tablet:gap-3 desktop:grid-cols-[minmax(90px,120fr)_210fr_210fr_95px] desktop:gap-0" @submit.prevent="search">
    <select v-model="pet" name="pet" class="field text-label desktop:rounded-r-none" aria-label="品種">
      <option value="">品種</option>
      <option v-for="option in petTypes" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
    <select v-model="service" name="service" class="field text-label desktop:rounded-none desktop:border-l-0" aria-label="服務">
      <option value="">服務</option>
      <option v-for="option in services" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
    <select v-model="city" name="city" class="field text-label desktop:rounded-none desktop:border-l-0" aria-label="地區">
      <option value="">地區</option>
      <option v-for="option in cities" :key="option">{{ option }}</option>
    </select>
    <button class="button button-primary text-label desktop:rounded-l-none">搜尋</button>
  </form>
</template>

<style scoped>
select {
  appearance: none;
  padding-inline-end: 24px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 6 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 0 0 4h6L3 0Zm0 10 3-4H0l3 4Z' fill='%23212529'/%3E%3C/svg%3E");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 6px 10px;
}

@media (forced-colors: active) {
  select {
    appearance: auto;
    background-image: none;
  }
}
</style>
