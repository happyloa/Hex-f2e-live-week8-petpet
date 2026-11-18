<script setup lang="ts">
import type { Reservation } from '~/composables/useBooking'

const { reservations, cancel } = useBooking()
const editing = ref('')
const start = ref('')
const end = ref('')
watch(start, (value) => {
  if (end.value < value) end.value = value
})

function edit(reservation: Reservation) {
  editing.value = reservation.id
  start.value = reservation.start
  end.value = reservation.end
}

function save(reservation: Reservation) {
  reservation.start = start.value
  reservation.end = end.value
  editing.value = ''
}
</script>

<template>
  <section class="w-full max-w-xl">
    <h2 class="text-heading font-bold">預約查詢</h2>
    <p v-if="!reservations.length" class="mt-8 rounded-ui bg-panel p-6">
      目前沒有預約。
      <NuxtLink to="/services" class="ml-2 text-action underline">預約服務</NuxtLink>
    </p>
    <ul v-else class="mt-8 grid gap-4">
      <li v-for="reservation in reservations" :key="reservation.id" class="rounded-ui border border-field p-5">
        <h3 class="text-label font-bold">{{ reservation.sitter }}・{{ reservation.service }}</h3>
        <p class="mt-2">{{ reservation.pet }}（{{ reservation.count }} 隻）</p>
        <form v-if="editing === reservation.id" class="mt-3 grid gap-3" @submit.prevent="save(reservation)">
          <div class="grid gap-1">開始日期<DatePickerField v-model="start" label="開始日期" /></div>
          <div class="grid gap-1">結束日期<DatePickerField v-model="end" label="結束日期" :min="start" /></div>
          <div class="flex gap-4">
            <button class="button button-primary">儲存日期</button>
            <button type="button" class="button button-outline" @click="editing = ''">返回</button>
          </div>
        </form>
        <template v-else>
          <p>{{ reservation.start }} 至 {{ reservation.end }}</p>
          <div class="mt-4 flex gap-5 text-action">
            <button type="button" class="hover:underline" @click="edit(reservation)">修改日期</button>
            <button type="button" class="hover:underline" @click="cancel(reservation.id)">取消預約</button>
          </div>
        </template>
      </li>
    </ul>
  </section>
</template>
