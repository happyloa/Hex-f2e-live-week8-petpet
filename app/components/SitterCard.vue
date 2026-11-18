<script setup lang="ts">
import { asset, serviceSummary, type Sitter } from '~/data/petpet'
import type { BookingOptions } from '~/composables/useBooking'

const props = defineProps<{ sitter: Sitter; compact?: boolean; booking?: BookingOptions }>()
const { open } = useBooking()

function book() {
  open(props.sitter, props.booking)
}
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-ui bg-panel shadow-card">
    <NuxtLink :to="'/sitters/' + sitter.id" class="block" :aria-label="'查看' + sitter.name">
      <img :src="asset(sitter.image)" alt="" loading="lazy" class="h-32 w-full object-cover transition-opacity hover:opacity-90">
    </NuxtLink>
    <div class="min-h-[120px] flex-1 px-3 pt-2.5 tablet:px-4">
      <h3><NuxtLink :to="'/sitters/' + sitter.id" class="hover:underline">{{ sitter.name }}</NuxtLink></h3>
      <StarRating class="text-label" />
      <p class="pb-2 text-sm">{{ serviceSummary(sitter) }}</p>
    </div>
    <div class="grid h-control grid-cols-2 bg-white text-center" :class="{ 'tablet:hidden': compact }">
      <NuxtLink :to="'/sitters/' + sitter.id" class="grid place-items-center transition-colors hover:bg-brand/10">聯繫</NuxtLink>
      <button type="button" class="text-action transition-colors hover:bg-action/10" @click="book">預約</button>
    </div>
  </article>
</template>
