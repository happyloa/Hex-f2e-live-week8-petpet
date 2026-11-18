<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()
const code = computed(() => error.statusCode || 500)
const isNotFound = computed(() => code.value === 404)
const title = computed(() => isNotFound.value ? '找不到這個頁面' : '頁面暫時無法載入')

useHead({ title })
</script>

<template>
  <NuxtLayout name="default">
    <div class="grid min-h-[inherit] items-center bg-brand-soft py-10 tablet:py-section">
      <div class="site-container grid items-center gap-gutter tablet:grid-cols-2 desktop:gap-section">
        <PetIllustration class="mx-auto h-[250px] w-full max-w-[300px] rounded-ui tablet:col-start-2 tablet:row-start-1 tablet:h-[380px] desktop:h-[470px] desktop:max-w-[340px]" />
        <section class="text-center tablet:col-start-1 tablet:row-start-1 tablet:text-left" aria-labelledby="error-title">
          <p class="text-label font-bold tracking-wide text-action">{{ code }}</p>
          <h1 id="error-title" class="mt-2 text-heading font-bold desktop:text-display">{{ title }}</h1>
          <p class="mx-auto mt-4 max-w-[32ch] text-label tablet:mx-0">
            {{ isNotFound ? '這個網址對應的頁面可能已搬移。你可以回首頁，或查看目前的寵物服務。' : '載入時發生錯誤。你可以回首頁再試一次，或直接瀏覽寵物服務。' }}
          </p>
          <div class="mt-7 flex flex-wrap justify-center gap-3 tablet:justify-start">
            <a href="/" class="button button-primary px-6">回到首頁</a>
            <a href="/services" class="button button-outline px-6">瀏覽寵物服務</a>
          </div>
        </section>
      </div>
    </div>
  </NuxtLayout>
</template>
