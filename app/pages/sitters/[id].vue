<script setup lang="ts">
import { services, sitters } from '~/data/petpet'

const route = useRoute()
const { open } = useBooking()
const sitter = computed(() => sitters.find(item => item.id === route.params.id))
if (!sitter.value) throw createError({ statusCode: 404, statusMessage: '找不到這位保姆' })

const isGoodHome = computed(() => sitter.value?.id === 'good-home')
const photos = computed(() => isGoodHome.value
  ? ['homestay-3.webp', 'index-5.webp', 'detail-1.webp', 'detail2.webp']
  : [sitter.value!.image])
const related = computed(() => ['pet-house', 'paw-team', 'pet-and-home', 'cat-butler', 'mimi', 'cat-first']
  .filter(id => id !== sitter.value?.id)
  .map(id => sitters.find(item => item.id === id)!))
const details = [
  { title: '關於', body: '家中有5隻貓寶貝，對貓咪有瘋狂的熱愛 。\n目前已經照顧超過30位狗狗貓咪朋友！對於我來說，能夠與你們相遇都是緣分！' },
  { title: '經歷', body: '曾接手過數次奶貓，照顧後送養成功，目前都是健健康康的毛孩。' },
  { title: '技能證照', body: '寵物美容丙級技術證' },
  { title: '提供', body: '貓砂盆、罐頭、乾飼料' },
  { title: '毛孩活動範圍', body: '想去的任何地方' },
  { title: '服務地區', body: '高雄市' },
]

definePageMeta({ showFooter: true })
useHead({ title: computed(() => sitter.value?.name ?? '寵物保姆') })
</script>

<template>
  <div v-if="sitter" class="site-container pt-1 pb-16 tablet:pt-[60px] tablet:pb-[60px] desktop:py-section">
    <div class="grid gap-y-10 tablet:grid-cols-[3fr_2fr] tablet:items-start tablet:gap-x-gutter desktop:grid-cols-2">
      <SitterGallery :photos="photos" :name="sitter.name" class="tablet:col-start-2 tablet:row-start-1" />
      <section class="tablet:col-start-1 tablet:row-start-1">
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-heading font-bold">{{ sitter.name }}</h1>
          <StarRating class="text-[28px]" />
        </div>
        <p class="mt-4 text-label font-bold desktop:text-lead">給予毛孩最舒適的環境是我們的職責！</p>
        <p class="mt-2">已提供 {{ sitter.orders ?? 0 }} 筆服務、並獲得 {{ sitter.reviews ?? 0 }} 個評價</p>
        <div class="mt-7 desktop:mt-[60px]">
          <h2 class="text-label font-bold">服務內容</h2>
          <ul v-if="isGoodHome" class="mt-3 space-y-2">
            <li>寄宿 NT$ 450 /晚</li>
            <li>美容洗澡 NT$ 500 （含剪指甲、剃腳底毛、清耳朵）<span class="block text-sm text-action">個性貓另加價</span></li>
            <li>到府保姆 NT$ 550 /晚</li>
          </ul>
          <ul v-else class="mt-3 space-y-2">
            <li v-for="service in services.filter(item => sitter?.services.includes(item.id))" :key="service.id">{{ service.name }}</li>
          </ul>
        </div>
        <div class="mt-6 flex gap-2 desktop:mt-10">
          <AppIcon name="place" class="text-action" />
          <p>
            <template v-if="isGoodHome">高雄市鹽埕區七賢三路123號<br></template>
            服務區域：{{ sitter.city }} 全區
          </p>
        </div>
        <div class="mt-7 grid max-w-[445px] grid-cols-2 gap-4 tablet:gap-gutter desktop:mt-[60px] desktop:grid-cols-[160px_1fr]">
          <a href="mailto:petpet@petmail.com" class="button button-outline text-label">聯繫</a>
          <button type="button" class="button button-primary text-label" @click="open(sitter)">立刻預約</button>
        </div>
      </section>
    </div>

    <div class="mt-12 grid gap-12 tablet:mt-16 tablet:gap-16 desktop:mt-[188px] desktop:w-[calc(50%-15px)] desktop:ml-auto desktop:gap-section">
      <section v-if="isGoodHome" class="grid gap-7 tablet:max-w-[390px] tablet:gap-8 desktop:max-w-none desktop:gap-[44px]">
        <div v-for="detail in details" :key="detail.title">
          <h2 class="text-lead font-bold">{{ detail.title }}</h2>
          <p class="mt-2 whitespace-pre-line desktop:text-label">{{ detail.body }}</p>
        </div>
      </section>
      <SitterReviews v-if="isGoodHome" :total="sitter.reviews ?? 0" />
      <section>
        <h2 class="text-subheading font-bold">
          其他 <NuxtLink :to="{ path: '/services', query: { city: sitter.city } }" class="text-action underline">{{ sitter.city }}</NuxtLink>{{ ' ' }}
          <NuxtLink to="/services" class="text-action underline">寄宿</NuxtLink> 的寵物保姆
        </h2>
        <ul v-reveal class="mt-5 grid grid-cols-2 gap-4 tablet:grid-cols-3 tablet:gap-x-gutter desktop:gap-2">
          <li v-for="item in related" :key="item.id">
            <SitterCard :sitter="item" compact class="h-full" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
