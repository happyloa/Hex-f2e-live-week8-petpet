<script setup lang="ts">
import { petTypes, services, type PetId, type ServiceId, type Sitter } from '~/data/petpet'

const props = defineProps<{ sitter: Sitter }>()
const options = computed(() => services.filter(item => item.id !== 'training' || props.sitter.services.includes('training')))
const availablePets = computed(() => petTypes.filter(item => props.sitter.pets.includes(item.id)))
const service = defineModel<ServiceId>('service', { required: true })
const dateStart = defineModel<string>('start', { required: true })
const dateEnd = defineModel<string>('end', { required: true })
const count = defineModel<number>('count', { required: true })
const pet = defineModel<PetId>('pet', { required: true })
const age = defineModel<number>('age', { required: true })

const nights = computed(() => Math.max(0, Math.round((Date.parse(dateEnd.value) - Date.parse(dateStart.value)) / 86400000)) || 0)
watch(dateStart, (start) => {
  if (start && dateEnd.value < start) dateEnd.value = start
})
</script>

<template>
  <div class="text-form">
    <fieldset>
      <legend class="sr-only">預約服務</legend>
      <div class="grid grid-cols-4 gap-2 desktop:gap-3">
        <label v-for="item in options" :key="item.id"
          class="relative flex min-h-[74px] cursor-pointer flex-col items-center justify-center rounded-ui border-2 border-transparent bg-white px-0.5 text-center text-sm text-muted shadow-card has-[:disabled]:cursor-not-allowed has-[:checked]:border-action has-[:checked]:text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action tablet:min-h-[128px] tablet:text-label">
          <input v-model="service" type="radio" name="booking-service" :value="item.id" :disabled="!sitter.services.includes(item.id)" class="peer sr-only">
          <AppIcon :name="item.icon" class="size-6 peer-checked:text-brand tablet:size-12" />
          <span class="mt-1">{{ item.short }}</span>
        </label>
      </div>
    </fieldset>
    <fieldset class="mt-6">
      <legend>選擇日期</legend>
      <div class="mt-1 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 tablet:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto]">
        <DatePickerField v-model="dateStart" label="預約開始日期" small />
        <span>至</span>
        <DatePickerField v-model="dateEnd" label="預約結束日期" :min="dateStart" small />
        <span>共 {{ nights }} 晚</span>
      </div>
    </fieldset>
    <div class="mt-5 flex flex-wrap gap-x-4 gap-y-2 tablet:gap-x-6">
      <label class="grid gap-1">
        毛孩數量
        <select v-model="count" class="field field-small px-2">
          <option v-for="number in 5" :key="number" :value="number">{{ number }} 隻</option>
        </select>
      </label>
      <label class="grid gap-1">
        您的毛孩是
        <select v-model="pet" class="field field-small px-2 tablet:w-[120px]">
          <option v-for="item in availablePets" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </label>
      <label class="grid gap-1">
        年齡
        <select v-model="age" class="field field-small px-2 tablet:w-32">
          <option v-for="year in 20" :key="year" :value="year">{{ year }} 歲</option>
        </select>
      </label>
    </div>
  </div>
</template>
