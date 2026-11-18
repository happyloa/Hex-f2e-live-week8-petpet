<script setup lang="ts">
const route = useRoute()
const menuOpen = defineModel<boolean>('menuOpen', { required: true })
const { isSignedIn, profile, signOut } = useMember()
const mobileMenu = ref<HTMLButtonElement>()
const memberMenu = ref<HTMLDetailsElement>()
let tabletViewport: MediaQueryList | undefined

function syncMobileMenu(event: MediaQueryListEvent) {
  if (event.matches) menuOpen.value = false
}

onMounted(() => {
  tabletViewport = window.matchMedia('(min-width: 48rem)')
  tabletViewport.addEventListener('change', syncMobileMenu)
})

onUnmounted(() => tabletViewport?.removeEventListener('change', syncMobileMenu))

watch(() => route.fullPath, () => {
  menuOpen.value = false
  if (memberMenu.value) memberMenu.value.open = false
})

function closeMenu() {
  if (menuOpen.value) {
    menuOpen.value = false
    mobileMenu.value?.focus()
  } else if (memberMenu.value?.open) {
    memberMenu.value.open = false
    memberMenu.value.querySelector('summary')?.focus()
  }
}
</script>

<template>
  <header class="sticky top-0 z-20 h-[62px] bg-white tablet:h-16" @keydown.esc="closeMenu">
    <div class="site-container flex h-full items-center justify-center tablet:justify-between">
      <NuxtLink to="/" class="logo -translate-y-1 tablet:translate-y-0" aria-label="PETPET 首頁"><span aria-hidden="true">PETPET</span></NuxtLink>
      <nav class="hidden items-center gap-10 tablet:flex" aria-label="主選單">
        <NuxtLink to="/services" class="hover:text-action">預約服務</NuxtLink>
        <!-- XD 僅提供加入入口，使用預留頁面。 -->
        <NuxtLink to="/info/join" class="hover:text-action">成為寵物保姆</NuxtLink>
        <NuxtLink v-if="!isSignedIn" to="/login" class="hover:text-action">登入</NuxtLink>
        <details v-else ref="memberMenu" class="group relative">
          <summary class="flex cursor-pointer list-none items-center gap-1">
            Hi, {{ profile.name }}
            <AppIcon name="down" class="size-4 group-open:rotate-180" />
          </summary>
          <div class="absolute top-[44px] right-0 z-30 grid w-48 gap-1 rounded-ui border border-field bg-white py-2 text-base shadow-sm">
            <NuxtLink to="/member" class="px-5 py-1 hover:bg-panel">會員資料</NuxtLink>
            <NuxtLink to="/member?tab=reservations#reservations" class="px-5 py-1 hover:bg-panel">預約查詢</NuxtLink>
            <!-- XD 未提供歷史預約畫板。 -->
            <NuxtLink to="/info/history" class="px-5 py-1 hover:bg-panel">歷史預約</NuxtLink>
            <!-- XD 僅提供切換保姆帳號入口，使用預留頁面。 -->
            <NuxtLink to="/info/sitter-account" class="mt-1 border-t border-field px-5 pt-2 text-action">切換保姆帳號</NuxtLink>
          </div>
        </details>
      </nav>
      <button ref="mobileMenu" type="button" class="absolute right-[15px] grid size-11 place-items-center text-logo tablet:hidden"
        :aria-label="menuOpen ? '關閉選單' : '開啟選單'" aria-controls="mobile-navigation" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        <AppIcon :name="menuOpen ? 'close' : 'menu'" class="size-10" />
      </button>
    </div>
    <nav v-show="menuOpen" id="mobile-navigation" :data-open="menuOpen || undefined" aria-label="手機選單"
      class="absolute top-full left-0 grid w-full h-[calc(100dvh-62px)] auto-rows-min overflow-y-auto bg-white text-center tablet:hidden">
      <NuxtLink to="/services" class="border-b border-field py-3 text-label" @click="menuOpen = false">預約服務</NuxtLink>
      <!-- XD 僅提供加入入口，使用預留頁面。 -->
      <NuxtLink to="/info/join" class="border-b border-field py-3 text-label" @click="menuOpen = false">成為寵物保姆</NuxtLink>
      <NuxtLink :to="isSignedIn ? '/member' : '/login'" class="border-b border-field py-3 text-label" @click="menuOpen = false">{{ isSignedIn ? '會員資料' : '登入' }}</NuxtLink>
      <NuxtLink v-if="isSignedIn" to="/member?tab=reservations#reservations" class="border-b border-field py-3 text-label" @click="menuOpen = false">預約查詢</NuxtLink>
      <button v-if="isSignedIn" type="button" class="border-b border-field py-3 text-label text-action" @click="signOut">登出</button>
    </nav>
  </header>
</template>
