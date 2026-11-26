<script setup lang="ts">
import type { ServiceId } from '~/data/petpet'

const footerServices = [
  { id: 'boarding', label: '寵物寄宿' },
  { id: 'home-care', label: '寵物到府保姆' },
  { id: 'grooming', label: '寵物美容洗澡' },
  { id: 'training', label: '寵物行為訓練' },
] as const satisfies readonly { id: ServiceId; label: string }[]

const email = ref('')
const sent = ref(false)

function requestHelp() {
  sent.value = true
  email.value = ''
}
</script>

<template>
  <section id="support" aria-labelledby="support-heading" class="bg-brand pt-9 pb-10 tablet:pb-9">
    <div class="site-container">
      <h2 id="support-heading" class="text-lead font-bold tablet:text-display">有任何我們能幫助您的嗎？</h2>
      <p class="mt-2 tablet:text-label">輸入電子信箱<br>將有專業人員在線幫您解決所有問題</p>
      <form class="mt-4 flex max-w-[510px] desktop:max-w-[540px]" @submit.prevent="requestHelp">
        <label for="support-contact" class="sr-only">電子信箱</label>
        <input id="support-contact" v-model="email" type="email" autocomplete="email" required
          placeholder="example@gmail.com" class="field flex-1 rounded-r-none px-3 font-latin">
        <button class="button button-primary w-[calc((100%-15px)/2)] rounded-l-none tablet:w-40">送出</button>
      </form>
      <p v-if="sent" class="mt-2" role="status">已完成表單示範。聯絡 PETPET 可使用下方電子郵件。</p>
    </div>
  </section>
  <footer class="site-container pt-[11px] pb-3 tablet:pb-[30px] tablet:pt-16">
    <div class="grid grid-cols-4 gap-gutter">
      <div class="col-span-4 tablet:col-span-1">
        <NuxtLink to="/" class="logo" aria-label="PETPET 首頁"><span aria-hidden="true">PETPET</span></NuxtLink>
        <ul class="mt-1 flex flex-wrap gap-x-4 gap-y-2 text-sm tablet:mt-8 tablet:block tablet:space-y-6 tablet:text-base">
          <li class="hidden tablet:list-item"><NuxtLink to="/#about" class="hover:underline">關於我們</NuxtLink></li>
          <li class="hidden tablet:list-item"><a href="#support" class="hover:underline">幫助中心</a></li>
          <li><NuxtLink to="/info/terms" class="hover:underline">使用條款</NuxtLink></li>
          <li><NuxtLink to="/info/privacy" class="hover:underline">隱私政策</NuxtLink></li>
        </ul>
      </div>
      <div class="hidden pt-2 tablet:block">
        <h2 class="text-label font-bold">寵物服務</h2>
        <ul class="mt-8 space-y-6">
          <li v-for="service in footerServices" :key="service.id">
            <NuxtLink :to="{ path: '/services', query: { service: service.id } }" class="hover:underline">
              {{ service.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="hidden pt-2 tablet:block">
        <h2 class="text-label font-bold">加入我們</h2>
        <ul class="mt-8 space-y-6">
          <li><NuxtLink to="/info/join" class="hover:underline">成為寵物保姆</NuxtLink></li>
          <!-- XD 只提供計程車與下載入口，使用預留頁面。 -->
          <li><NuxtLink to="/info/taxi" class="hover:underline">加入寵物計程車</NuxtLink></li>
          <li><NuxtLink to="/info/app" class="hover:underline">專屬 APP 下載</NuxtLink></li>
          <li><NuxtLink to="/info/terms" class="hover:underline">相關合約條款</NuxtLink></li>
        </ul>
      </div>
      <div class="hidden pt-2 tablet:block">
        <h2 class="text-label font-bold">聯繫我們</h2>
        <a class="mt-8 inline-block hover:underline" href="mailto:petpet@petmail.com">petpet@petmail.com</a>
      </div>
    </div>
    <div class="flex items-end justify-between tablet:mt-[108px]">
      <a href="tel:+88671234567" class="hidden items-center gap-2 text-label tablet:flex">
        <AppIcon name="phone" /> 07-123-4567
      </a>
      <small class="font-latin text-sm tablet:mr-7">Copyright © 2020 PetPet. All rights reserved.</small>
    </div>
  </footer>
</template>
