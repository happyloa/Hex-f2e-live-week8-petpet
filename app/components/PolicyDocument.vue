<script setup lang="ts">
interface PolicyLink {
  to: string
  label: string
}

interface PolicySection {
  id: string
  title: string
  paragraphs: readonly string[]
  link?: PolicyLink
}

defineProps<{
  title: string
  summary: string
  updated: string
  sections: readonly PolicySection[]
  related: PolicyLink
}>()
</script>

<template>
  <header class="border-b border-brand/40 bg-brand-soft py-10 tablet:py-14 desktop:py-16">
    <div class="site-container">
      <h1 class="text-heading font-bold tablet:text-display">{{ title }}</h1>
      <p class="mt-2 max-w-[42rem] leading-relaxed tablet:text-label">{{ summary }}</p>
      <p class="mt-4 text-sm">更新日期 <time :datetime="updated" class="font-latin">{{ updated }}</time></p>
    </div>
  </header>

  <div class="site-container grid items-start gap-8 py-10 tablet:grid-cols-[minmax(10rem,1fr)_minmax(0,3fr)] tablet:gap-gutter tablet:py-14 desktop:grid-cols-[14rem_minmax(0,1fr)] desktop:gap-14">
    <nav aria-labelledby="policy-toc" class="rounded-ui bg-brand-soft px-5 py-4 tablet:sticky tablet:top-20">
      <h2 id="policy-toc" class="font-bold">本頁內容</h2>
      <ul class="mt-1">
        <li v-for="section in sections" :key="section.id">
          <a :href="'#' + section.id" class="flex min-h-11 items-center py-1 text-action-text hover:underline">
            {{ section.title }}
          </a>
        </li>
      </ul>
    </nav>

    <article class="max-w-[46rem]" :aria-label="title">
      <section v-for="section in sections" :id="section.id" :key="section.id" tabindex="-1"
        class="scroll-mt-20 border-b border-field py-6 first:pt-0">
        <h2 class="text-label font-bold tablet:text-lead">{{ section.title }}</h2>
        <div class="mt-2 space-y-2 leading-relaxed">
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <p v-if="section.link">
            <NuxtLink :to="section.link.to" class="text-action-text underline underline-offset-2">
              {{ section.link.label }}
            </NuxtLink>
          </p>
        </div>
      </section>
      <NuxtLink :to="related.to" class="button button-outline mt-6 gap-1.5">
        {{ related.label }} <AppIcon name="right" class="size-4" />
      </NuxtLink>
    </article>
  </div>
</template>
