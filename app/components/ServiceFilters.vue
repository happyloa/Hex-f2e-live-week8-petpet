<script setup lang="ts">
import { cities, petTypes } from '~/data/petpet'

const pet = defineModel<string>('pet', { required: true })
const city = defineModel<string>('city', { required: true })
const start = defineModel<string>('start', { required: true })
const end = defineModel<string>('end', { required: true })
watch(start, () => {
  if (end.value && start.value && end.value < start.value) end.value = start.value
})
</script>

<template>
  <div class="bg-brand py-4 text-form">
    <div class="site-container flex flex-wrap items-center gap-2">
      <select v-model="pet" class="field field-small px-2 tablet:max-w-32" aria-label="篩選品種">
        <option value="">全部品種</option>
        <option v-for="option in petTypes" :key="option.id" :value="option.id">{{ option.name }}</option>
      </select>
      <select v-model="city" class="field field-small w-40" aria-label="篩選地區">
        <option value="">全部地區</option>
        <option v-for="option in cities" :key="option">{{ option }}</option>
      </select>
      <div class="flex w-full items-center gap-2 tablet:w-auto">
        <DatePickerField v-model="start" label="服務開始日期" small class="w-full tablet:w-40" />
        <span class="hidden tablet:inline">至</span>
        <DatePickerField v-model="end" label="服務結束日期" :min="start" small class="w-full tablet:w-40" />
      </div>
    </div>
  </div>
</template>
