<script setup lang="ts">
import { asset } from '~/data/petpet'

const props = defineProps<{ photos: string[]; name: string }>()
const current = ref(0)
watch(() => props.photos[0], () => { current.value = 0 })
</script>

<template>
  <div class="min-w-0">
    <img :src="asset(photos[current]!)" :alt="name + '的服務照片 ' + (current + 1)"
      class="gallery-main w-full rounded-ui object-cover" fetchpriority="high">
    <div v-if="photos.length > 1" class="mt-2 grid max-w-[408px] grid-cols-4 gap-2 desktop:mt-3">
      <button v-for="(photo, index) in photos" :key="photo" type="button" :aria-label="'顯示照片 ' + (index + 1)"
        :aria-pressed="index === current" class="overflow-hidden rounded-ui transition-opacity hover:opacity-75" @click="current = index">
        <img :src="asset(photo)" alt="" class="aspect-square w-full object-cover">
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery-main { aspect-ratio: 540 / 440; object-position: center 46%; }
</style>
