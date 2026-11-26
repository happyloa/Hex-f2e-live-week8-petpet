<script setup lang="ts">
import { demoReservationDates } from '~/composables/useBooking'
import { asset, services, sitters } from '~/data/petpet'

const route = useRoute()
const service = computed(() => services.find(item => item.id === route.query.service) ?? services[0])
const queryFilter = (value: unknown, fallback: string) =>
  typeof value === 'string' && value ? value : fallback
const pet = ref(queryFilter(route.query.pet, 'cat'))
const city = ref(queryFilter(route.query.city, '高雄市'))
const start = ref(demoReservationDates.start)
const end = ref(demoReservationDates.end)
const page = ref(1)
// XD 平板版一頁 3 欄 × 3 列，桌機與手機為 8 張。
const pageSize = ref(8)
let tabletViewport: MediaQueryList | undefined
const syncPageSize = () => { pageSize.value = tabletViewport?.matches ? 9 : 8 }
const results = computed(() => sitters.filter(sitter => sitter.services.includes(service.value.id)
  && (!city.value || sitter.city === city.value)
  && (!pet.value || sitter.pets.some(type => type === pet.value))))
const featuredResults = computed(() => results.value.filter(sitter => sitter.avatar))
const booking = computed(() => ({ service: service.value.id, pet: pet.value, start: start.value, end: end.value }))
const pages = computed(() => Math.ceil(results.value.length / pageSize.value))
const visibleSitters = computed(() => results.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))

watch(() => route.query, (query) => {
  pet.value = queryFilter(query.pet, 'cat')
  city.value = queryFilter(query.city, '高雄市')
})
watch([service, pet, city, pageSize], () => { page.value = 1 })

onMounted(() => {
  tabletViewport = window.matchMedia('(48rem <= width < 64rem)')
  syncPageSize()
  tabletViewport.addEventListener('change', syncPageSize)
})
onUnmounted(() => tabletViewport?.removeEventListener('change', syncPageSize))

useHead({ title: computed(() => service.value.name) })
</script>

<template>
  <section class="flex flex-col tablet:site-container tablet:min-h-[435px] tablet:flex-row-reverse tablet:items-center tablet:gap-gutter">
    <img :src="asset(service.id === 'boarding' ? 'homestay-1.png' : service.image)" alt=""
      class="h-[352px] w-full bg-brand object-cover tablet:h-[315px] tablet:w-[57%] desktop:w-[65.77%]"
      :class="{ 'object-[36%_center] tablet:object-center': service.id === 'boarding' }">
    <div class="site-container py-3 text-center tablet:w-auto tablet:flex-1 tablet:py-0 tablet:text-left">
      <h1 class="text-subheading font-bold tablet:text-display">{{ service.name }}</h1>
      <p class="mt-1 text-label font-medium tablet:mt-2 tablet:text-lead tablet:font-bold">給您的毛孩最舒適的環境</p>
    </div>
  </section>
  <ServiceFilters v-model:pet="pet" v-model:city="city" v-model:start="start" v-model:end="end" />
  <FeaturedSitters :title="'本月熱門' + service.short" :sitters="featuredResults" :booking="booking" all-services class="mt-16 desktop:mt-section" />
  <section aria-label="寵物保姆搜尋結果" class="site-container py-10 tablet:py-[60px] desktop:py-section">
    <ul v-if="visibleSitters.length" class="grid grid-cols-2 gap-x-4 gap-y-5 tablet:grid-cols-3 tablet:gap-x-gutter desktop:grid-cols-4 desktop:gap-y-8">
      <li v-for="sitter in visibleSitters" :key="sitter.id">
        <SitterCard :sitter="sitter" :booking="booking" class="h-full" />
      </li>
    </ul>
    <p v-else class="rounded-ui bg-panel px-6 py-12 text-center" role="status">目前沒有符合篩選條件的保姆，請試試其他品種或地區。</p>
    <nav v-if="pages > 1" class="mt-5 flex justify-end" aria-label="搜尋結果頁面">
      <button type="button" aria-label="上一頁" :disabled="page === 1" class="h-control-small w-10 rounded-l-ui border border-field disabled:opacity-50" @click="page--">«</button>
      <button v-for="number in pages" :key="number" type="button" :aria-current="page === number ? 'page' : undefined"
        class="h-control-small w-10 border-y border-r border-field aria-[current=page]:bg-panel aria-[current=page]:font-bold" @click="page = number">{{ number }}</button>
      <button type="button" aria-label="下一頁" :disabled="page === pages" class="h-control-small w-10 rounded-r-ui border-y border-r border-field disabled:opacity-50" @click="page++">»</button>
    </nav>
  </section>
</template>
