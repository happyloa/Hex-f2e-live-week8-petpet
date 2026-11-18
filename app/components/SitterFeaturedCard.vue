<script setup lang="ts">
import type { BookingOptions } from '~/composables/useBooking'
import { asset, serviceSummary, type Sitter } from '~/data/petpet'

defineProps<{ sitter: Sitter; allServices?: boolean; booking?: BookingOptions }>()
const { open } = useBooking()
</script>

<template>
  <article class="flex min-h-[422px] flex-col items-center overflow-hidden rounded-ui bg-white text-center shadow-card">
    <NuxtLink :to="'/sitters/' + sitter.id" :aria-label="'查看 ' + sitter.name + ' 的資料'" class="block w-full">
      <img :src="asset(sitter.image)" alt="" class="h-[120px] w-full border-[5px] border-white object-cover" loading="lazy" :class="{ 'object-[center_25%]': sitter.id === 'eric' }">
    </NuxtLink>
    <img v-if="sitter.avatar" :src="asset(sitter.avatar)" alt="" width="100" height="100" loading="lazy" class="relative -mt-[50px] rounded-full">
    <h3 class="mt-2 text-label font-medium"><NuxtLink :to="'/sitters/' + sitter.id" class="hover:underline">{{ sitter.name }}</NuxtLink></h3>
    <p class="mt-1 px-1">{{ sitter.id === 'yvonne' && !allServices ? '美容、寵物行為訓練' : serviceSummary(sitter, true) }}</p>
    <button type="button" class="button button-primary mt-2 w-40" @click="open(sitter, booking)">預約</button>
    <dl class="mt-6 flex w-full max-w-[264px] justify-around gap-2 px-2 pb-7">
      <div>
        <dt>獲得評價</dt>
        <dd class="mt-2"><strong class="text-subheading">{{ sitter.reviews ?? 0 }}</strong> <span class="text-sm">則</span></dd>
      </div>
      <div>
        <dt>已完成訂單</dt>
        <dd class="mt-2"><strong class="text-subheading">{{ sitter.orders ?? 0 }}</strong> <span class="text-sm">件</span></dd>
      </div>
    </dl>
  </article>
</template>
