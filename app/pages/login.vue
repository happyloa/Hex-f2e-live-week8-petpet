<script setup lang="ts">
import { demoLoginStorageKey } from '~/composables/useMember'
import { asset } from '~/data/petpet'

const { isSignedIn } = useMember()
const email = ref('')
const password = ref('')
const remember = ref(false)

definePageMeta({ hideSiteFooter: true })
useHead({ title: '登入' })

function enterDemo() {
  password.value = ''
  isSignedIn.value = true
  try {
    if (remember.value) localStorage.setItem(demoLoginStorageKey, 'true')
    else localStorage.removeItem(demoLoginStorageKey)
  } catch { /* The login still works when browser storage is unavailable. */ }
  return navigateTo('/member')
}
</script>

<template>
  <section class="login-page relative">
    <PetIllustration class="login-picture hidden desktop:block" />
    <div class="login-inner site-container">
      <div class="login-content">
        <h1 class="text-heading font-bold">登入</h1>
        <form class="mt-7 text-form tablet:mt-[60px]" aria-describedby="demo-login-note" @submit.prevent="enterDemo">
          <label class="grid gap-1">電子信箱
            <input v-model="email" type="email" required placeholder="example@gmail.com" autocomplete="off" class="field text-label">
          </label>
          <label class="mt-4 grid gap-1">密碼
            <input v-model="password" type="password" required placeholder="請輸入密碼" autocomplete="off" class="field text-label">
          </label>
          <!-- XD 無忘記密碼畫板，連結至預留頁面。 -->
          <NuxtLink to="/info/password" class="mt-1 block text-sm text-muted hover:underline">忘記密碼</NuxtLink>
          <label class="mt-4 flex items-center gap-1.5">
            <input v-model="remember" type="checkbox" class="size-4 accent-action">
            記住我的帳號
          </label>
          <div class="mt-6 grid gap-3 desktop:grid-cols-2 desktop:gap-2">
            <button v-for="provider in ['Facebook', 'Google']" :key="provider" type="button"
              class="button gap-3 border border-field text-muted hover:bg-panel" @click="enterDemo">
              <img :src="asset(provider.toLowerCase() + '.svg')" alt="" width="24" height="24">{{ provider }}
            </button>
          </div>
          <button class="button button-primary mt-10 w-full text-label desktop:w-[255px]">登入</button>
        </form>
        <!-- XD 無註冊畫板，連結至預留頁面。 -->
        <NuxtLink to="/info/register" class="mt-2 inline-block text-action hover:underline">還沒註冊嗎？</NuxtLink>
        <p id="demo-login-note" class="sr-only">切版作業示範，請使用測試資料。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-inner { padding-block: 58px 32px; }
@media (width >= 48rem) {
  .login-inner { padding-top: 176px; }
  .login-content { max-width: 450px; margin-inline: auto; }
}
@media (width >= 64rem) {
  .login-picture { position: absolute; inset: 0 auto 0 0; width: calc(50% - 110px); }
  .login-inner { display: flex; min-height: 736px; justify-content: flex-end; padding-top: 112px; }
  .login-content { width: calc(100% - 475px); max-width: none; margin: 0; }
}
</style>
