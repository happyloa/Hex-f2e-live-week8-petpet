<script setup lang="ts">
const { isSignedIn, profile } = useMember()
const { reservations } = useBooking()
const route = useRoute()
onMounted(() => { isSignedIn.value = true })
useHead({ title: '會員中心' })
</script>

<template>
  <div class="site-container grid gap-14 pt-[60px] pb-12 tablet:gap-gutter tablet:pt-[260px] desktop:pt-[152px]">
    <div class="grid gap-14 tablet:grid-cols-2 tablet:gap-gutter">
      <MemberProfile class="desktop:ml-24" />
      <section class="tablet:mt-[84px] desktop:mt-[73px]">
        <h2 class="text-lead font-bold desktop:text-heading">
          Hi, {{ profile.name }}<br>
          喜歡我們提供的服務嗎？<br>
          現在你也可以成為寵物保姆囉<span class="hidden desktop:inline">！</span>
        </h2>
        <!-- XD 僅提供加入入口，連結至預留頁面。 -->
        <NuxtLink to="/info/join" class="button button-primary mt-8 w-full text-label desktop:w-[255px]">成為寵物保姆</NuxtLink>
      </section>
    </div>
    <MemberReservations v-if="reservations.length || route.query.tab === 'reservations'" id="reservations" class="scroll-mt-24 desktop:mx-24" />
  </div>
</template>
