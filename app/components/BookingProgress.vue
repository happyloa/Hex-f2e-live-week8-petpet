<script setup lang="ts">
defineProps<{ current: number }>()
const steps = ['預約項目', '預約資料', '付款資訊']
</script>
<template>
  <ol class="grid grid-cols-3 border-t-2 border-action/55 text-center text-base text-form">
    <li v-for="(step, index) in steps" :key="step" :aria-current="index === current ? 'step' : undefined"
      class="relative pt-2 before:absolute before:-top-[5px] before:left-1/2 before:size-2 before:-translate-x-1/2 before:rounded-full before:bg-action aria-[current=step]:font-bold">
      {{ step }}
    </li>
  </ol>
</template>
