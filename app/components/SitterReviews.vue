<script setup lang="ts">
import { asset, featuredReviews } from '~/data/petpet'

defineProps<{ total: number }>()
const expanded = ref(false)
</script>

<template>
  <section>
    <h2 class="text-subheading font-bold">飼主評論（{{ total }}）</h2>
    <ul v-reveal class="mt-5 grid gap-5 tablet:grid-flow-col tablet:grid-rows-3 tablet:grid-cols-2 tablet:gap-x-gutter">
      <li v-for="review in featuredReviews" :key="review.name"
        class="flex min-h-[116px] items-center gap-4 rounded-ui border border-field p-3 desktop:gap-5 desktop:py-4 desktop:pl-4 desktop:pr-2">
        <img :src="asset(review.avatar)" alt="" loading="lazy" width="60" height="60" class="size-[60px] rounded-full">
        <div class="min-w-0">
          <p class="flex flex-wrap items-baseline gap-x-2">
            {{ review.name }}
            <time datetime="2020-10-17" class="text-sm text-muted">Oct 17 2020</time>
          </p>
          <StarRating class="my-1 text-lead" />
          <p :class="{ truncate: !expanded }">{{ review.text }}</p>
        </div>
      </li>
    </ul>
    <div class="mt-2 text-right">
      <button type="button" :aria-expanded="expanded" class="text-label hover:underline" @click="expanded = !expanded">
        {{ expanded ? '收合評論' : '查看更多' }}
      </button>
      <p v-if="expanded" class="mt-2 text-sm text-muted" role="status">以上為設計稿提供的 6 則示範評論。</p>
    </div>
  </section>
</template>
