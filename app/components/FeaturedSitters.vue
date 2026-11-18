<script setup lang="ts">
import { featuredSitters } from '~/data/petpet'

defineProps<{ title: string; subtitle?: string; allServices?: boolean }>()
const offset = ref(0)
const cards = computed(() => featuredSitters.map((_, index) => featuredSitters[(index + offset.value) % featuredSitters.length]!))
</script>

<template>
  <section id="featured" class="site-container scroll-mt-24">
    <h2 class="text-heading font-bold">{{ title }}</h2>
    <p v-if="subtitle" class="mt-1 text-label">{{ subtitle }}</p>
    <div v-reveal class="relative mt-3 tablet:mt-4">
      <TransitionGroup tag="div" name="sitter" class="relative grid gap-3 tablet:grid-cols-3 tablet:gap-gutter">
        <SitterFeaturedCard v-for="sitter in cards" :key="sitter.id" :sitter="sitter" :all-services="allServices" />
      </TransitionGroup>
      <button type="button" aria-label="下一位熱門保姆"
        class="absolute top-1/2 -right-[22px] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-action tablet:grid"
        @click="offset = (offset + 1) % featuredSitters.length">
        <AppIcon name="right" class="size-8" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.sitter-move { transition: transform 300ms ease; }
</style>
