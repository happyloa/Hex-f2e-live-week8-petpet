<script setup lang="ts">
import { asset, services, sitters } from '~/data/petpet'

const route = useRoute()
const service = computed(() => services.find(item => item.id === route.query.service) ?? services[0])
const pet = ref(typeof route.query.pet === 'string' ? route.query.pet : 'cat')
const city = ref(typeof route.query.city === 'string' ? route.query.city : '高雄市')
const start = ref('2020-11-20')
const end = ref('2020-11-21')
const page = ref(1)
const pageSize = 8
const results = computed(() => sitters.filter(sitter => sitter.services.includes(service.value.id)
  && (!city.value || sitter.city === city.value)
  && (!pet.value || sitter.pets.some(type => type === pet.value))))
const pages = computed(() => Math.ceil(results.value.length / pageSize))
const visibleSitters = computed(() => results.value.slice((page.value - 1) * pageSize, page.value * pageSize))

watch(() => route.query, (query) => {
  pet.value = typeof query.pet === 'string' ? query.pet : 'cat'
  city.value = typeof query.city === 'string' ? query.city : '高雄市'
})
watch([service, pet, city], () => { page.value = 1 })

definePageMeta({ showFooter: true })
useHead({ title: computed(() => service.value.name) })
</script>

<template>
  <section class="flex flex-col tablet:site-container tablet:min-h-[435px] tablet:flex-row-reverse tablet:items-center tablet:gap-gutter">
    <img :src="asset(service.id === 'boarding' ? 'homestay-1.png' : service.image)" alt=""
      class="h-[352px] w-full bg-brand object-cover tablet:h-[315px] tablet:w-[57%] desktop:w-[65.77%]">
    <div class="site-container py-3 text-center tablet:w-auto tablet:flex-1 tablet:py-0 tablet:text-left">
      <h1 class="text-subheading font-bold tablet:text-display">{{ service.name }}</h1>
      <p class="mt-1 text-label font-medium tablet:mt-2 tablet:text-lead tablet:font-bold">給您的毛孩最舒適的環境</p>
    </div>
  </section>
  <ServiceFilters v-model:pet="pet" v-model:city="city" v-model:start="start" v-model:end="end" />
  <FeaturedSitters :title="'本月熱門' + service.short" all-services class="mt-16 desktop:mt-section" />
  <section aria-label="寵物保姆搜尋結果" class="site-container py-10 tablet:py-[60px] desktop:py-section">
    <ul v-if="visibleSitters.length" class="grid grid-cols-2 gap-x-4 gap-y-5 tablet:grid-cols-3 tablet:gap-x-gutter desktop:grid-cols-4 desktop:gap-y-8">
      <li v-for="sitter in visibleSitters" :key="sitter.id">
        <SitterCard :sitter="sitter" :service="service.id" :start="start" :end="end" :pet="pet" class="h-full" />
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
