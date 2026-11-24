<script setup lang="ts">
import { asset, services, type ServiceId } from '~/data/petpet'

const serviceDescriptions: Partial<Record<ServiceId, string>> = {
  boarding: '準備安全的照護空間，在飼主外出期間照料毛孩的作息。',
  'home-care': '到飼主家餵食、換水、清理環境，在毛孩熟悉的地方陪伴牠。',
  walking: '依狗狗的體力和習慣安排散步，讓牠安全地活動、探索。',
}
const sitterServices = services.flatMap((service) => {
  const description = serviceDescriptions[service.id]
  return description ? [{ ...service, description }] : []
})

const steps = [
  {
    title: '整理照顧經驗',
    description: '想想你熟悉的寵物類型，以及可以提供服務的地區、項目和時段。',
  },
  {
    title: '寄出加入意願',
    description: '簡單介紹自己，附上照顧經驗及可提供的服務，讓 PETPET 認識你。',
  },
  {
    title: '確認後續安排',
    description: '與 PETPET 確認服務內容、申請條件及接下來需要準備的資料。',
  },
]

const questions = [
  {
    title: '沒有當過寵物保姆，也可以聯繫嗎？',
    answer:
      '可以先在信中介紹自己照顧寵物的經驗，例如照顧自家毛孩或協助親友，再向 PETPET 確認適合的服務和申請條件。',
  },
  {
    title: '一定要提供所有服務嗎？',
    answer:
      '你可以從熟悉的項目開始規劃。來信時列出想提供的服務、地區和可配合的時段，方便後續討論。',
  },
  {
    title: '點選「開啟申請信」後會發生什麼事？',
    answer:
      '系統會開啟你的郵件應用程式並帶入信件範本。填寫並確認內容後，再從郵件應用程式寄出。',
  },
]

const contactEmail = 'petpet@petmail.com'
const applicationSubject = 'PETPET 寵物保姆加入意願'
const applicationBody = [
  'PETPET 您好，我想了解如何加入成為寵物保姆。',
  '',
  '姓名或稱呼：',
  '服務地區與時段：',
  '想提供的服務：',
  '照顧寵物的經驗：',
].join('\r\n')
const applicationLink = `mailto:${contactEmail}?subject=${encodeURIComponent(applicationSubject)}&body=${encodeURIComponent(applicationBody)}`

useSeoMeta({
  title: '成為寵物保姆',
  description:
    '了解 PETPET 寵物保姆的服務內容和加入流程，準備你的照顧經驗與服務資料，來信洽詢。',
})
</script>

<template>
  <section class="bg-brand-soft" aria-labelledby="join-heading">
    <div
      class="site-container grid items-center gap-8 pt-10 pb-12 tablet:grid-cols-2 tablet:gap-gutter tablet:py-14 desktop:grid-cols-[5fr_6fr] desktop:gap-14 desktop:py-18"
    >
      <div>
        <h1
          id="join-heading"
          class="text-heading leading-tight font-bold desktop:text-[3rem]"
        >
          成為寵物保姆
        </h1>
        <p
          class="mt-4 max-w-[27rem] text-base leading-relaxed tablet:text-label"
        >
          把你照顧毛孩的經驗，變成讓飼主安心的服務。從熟悉的照護項目開始，陪伴更多毛孩。
        </p>
        <div class="mt-6 flex flex-wrap gap-3 tablet:mt-8">
          <a href="#apply" class="button button-primary gap-1.5 px-5">
            我要加入 <AppIcon name="right" class="size-4" />
          </a>
          <a href="#steps" class="button button-outline px-5">了解加入流程</a>
        </div>
      </div>
      <div class="relative isolate mr-2.5 mb-2.5 tablet:mr-3 tablet:mb-3">
        <div
          aria-hidden="true"
          class="absolute inset-0 -z-10 translate-x-2.5 translate-y-2.5 rounded-ui bg-brand tablet:translate-x-3 tablet:translate-y-3"
        />
        <img
          :src="asset('index-4.webp')"
          width="1650"
          height="1101"
          alt="兩隻狗依偎在照顧者腿上"
          fetchpriority="high"
          class="aspect-[3/2] w-full rounded-ui object-cover"
        />
      </div>
    </div>
  </section>

  <section
    class="site-container py-12 desktop:py-section"
    aria-labelledby="sitter-services-heading"
  >
    <h2
      id="sitter-services-heading"
      class="text-subheading font-bold desktop:text-heading"
    >
      你可以提供哪些服務？
    </h2>
    <ul
      class="mt-5 grid gap-5 tablet:grid-cols-3 desktop:mt-7 desktop:gap-gutter"
    >
      <li
        v-for="service in sitterServices"
        :key="service.id"
        class="overflow-hidden rounded-ui bg-white shadow-card"
      >
        <img
          :src="asset(service.image)"
          alt=""
          loading="lazy"
          class="aspect-[2/1] w-full object-cover"
        />
        <div class="p-4 desktop:p-5">
          <h3 class="flex items-center gap-2 text-label font-bold">
            <AppIcon :name="service.icon" class="size-5 text-action" />
            {{ service.name }}
          </h3>
          <p class="mt-2 leading-relaxed">{{ service.description }}</p>
        </div>
      </li>
    </ul>
  </section>

  <section
    id="steps"
    class="scroll-mt-16 bg-brand-soft py-12 desktop:py-16"
    aria-labelledby="steps-heading"
  >
    <div class="site-container">
      <h2
        id="steps-heading"
        class="text-subheading font-bold desktop:text-heading"
      >
        加入流程
      </h2>
      <ol
        class="mt-5 grid gap-5 tablet:grid-cols-3 desktop:mt-7 desktop:gap-gutter"
      >
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="flex items-start gap-4 border-t border-brand pt-4 tablet:flex-col tablet:gap-3"
        >
          <span
            aria-hidden="true"
            class="grid size-10 shrink-0 place-items-center rounded-full bg-brand font-latin text-label font-bold"
          >{{ index + 1 }}</span>
          <div>
            <h3 class="text-label font-bold">{{ step.title }}</h3>
            <p class="mt-1 leading-relaxed">{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <div
    class="site-container grid gap-10 py-12 tablet:grid-cols-2 tablet:items-start desktop:gap-section desktop:py-section"
  >
    <section
      id="apply"
      class="scroll-mt-20 rounded-ui bg-brand-soft p-5 tablet:p-6 desktop:p-8"
      aria-labelledby="apply-heading"
    >
      <h2 id="apply-heading" class="text-subheading font-bold">
        聯繫 PETPET 申請加入
      </h2>
      <p class="mt-2 leading-relaxed">
        開啟申請信範本，填寫你的照顧經驗、服務項目與可配合的時段，再由你的郵件應用程式寄出。
      </p>
      <a
        :href="applicationLink"
        class="button button-primary mt-5 gap-1.5 px-5"
      >
        開啟申請信 <AppIcon name="right" class="size-4" />
      </a>
      <p class="mt-3 text-sm">
        聯絡信箱
        <a
          :href="`mailto:${contactEmail}`"
          class="font-latin text-action-text underline underline-offset-2"
        >{{ contactEmail }}</a>
      </p>
    </section>

    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-subheading font-bold">常見問題</h2>
      <div class="mt-3 divide-y divide-field border-y border-field">
        <details
          v-for="question in questions"
          :key="question.title"
          class="group"
        >
          <summary
            class="flex min-h-control cursor-pointer list-none items-center justify-between gap-3 py-3 font-bold hover:text-action-text [&::-webkit-details-marker]:hidden"
          >
            {{ question.title }}
            <AppIcon name="down" class="size-5 group-open:rotate-180" />
          </summary>
          <p class="pb-4 leading-relaxed">{{ question.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
