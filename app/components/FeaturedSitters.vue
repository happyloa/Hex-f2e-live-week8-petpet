<script setup lang="ts">
import type { BookingOptions } from '~/composables/useBooking'
import { featuredSitters, type Sitter } from '~/data/petpet'

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  allServices?: boolean
  sitters?: Sitter[]
  booking?: BookingOptions
}>(), { sitters: () => featuredSitters })

const offset = ref(0)
const cards = computed(() => [...props.sitters.slice(offset.value), ...props.sitters.slice(0, offset.value)])

watch(() => props.sitters, () => { offset.value = 0 })
</script>

<template>
  <section v-if="cards.length" id="featured" class="site-container scroll-mt-24">
    <h2 class="text-heading font-bold">{{ title }}</h2>
    <p v-if="subtitle" class="mt-1 text-label">{{ subtitle }}</p>
    <div class="relative mt-3 tablet:mt-4">
      <TransitionGroup tag="div" name="sitter" class="relative grid gap-3 tablet:grid-cols-3 tablet:gap-gutter">
        <SitterFeaturedCard v-for="sitter in cards" v-reveal :key="sitter.id" :sitter="sitter" :booking="booking" :all-services="allServices" />
      </TransitionGroup>
      <button v-if="cards.length > 1" type="button" aria-label="下一位熱門保姆"
        class="absolute top-1/2 -right-[22px] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-action tablet:grid"
        @click="offset = (offset + 1) % cards.length">
        <AppIcon name="right" class="size-8" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.sitter-move { transition: transform 300ms ease; }
</style>
