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
  <form class="grid gap-4 tablet:gap-3 desktop:grid-cols-[minmax(90px,120fr)_210fr_210fr_95px] desktop:gap-0" @submit.prevent="search">
    <select v-model="pet" class="field text-label desktop:rounded-r-none" aria-label="品種">
      <option value="">品種</option>
      <option v-for="option in petTypes" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
    <select v-model="service" class="field text-label desktop:rounded-none desktop:border-l-0" aria-label="服務">
      <option value="">服務</option>
      <option v-for="option in services" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
    <select v-model="city" class="field text-label desktop:rounded-none desktop:border-l-0" aria-label="地區">
      <option value="">地區</option>
      <option v-for="option in cities" :key="option">{{ option }}</option>
    </select>
    <button class="button button-primary text-label desktop:rounded-l-none">搜尋</button>
  </form>
</template>
