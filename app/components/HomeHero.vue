<template>
  <section class="hero relative bg-white">
    <PetIllustration class="hero-picture" />
    <div class="hero-inner site-container">
      <div class="hero-content">
        <h1 class="text-subheading font-bold tablet:text-heading desktop:text-display">寵物服務，盡在 PETPET</h1>
        <p class="mt-1 text-label font-medium tablet:mt-2 desktop:mt-4 desktop:text-lead desktop:font-bold">
          當您的毛孩有需要時，<br class="desktop:hidden">幫您找到最合適的服務者！
        </p>
        <ServiceSearch class="mt-3 tablet:mt-5 desktop:mt-12" />
      </div>
      <a href="#featured" aria-label="前往本月熱門保姆"
        class="absolute right-0 bottom-8 hidden size-11 place-items-center rounded-full bg-action text-white transition-colors hover:bg-action-hover tablet:grid desktop:bottom-[30px]">
        <AppIcon name="down" class="size-8" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero-picture { height: 352px; }
.hero-content { padding-top: 12px; text-align: center; }
.hero-inner { position: relative; }

@media (width >= 48rem) {
  .hero { padding-top: 104px; }
  .hero-picture { width: 210px; height: 288px; margin-inline: auto; }
  .hero-inner { min-height: 570px; }
  .hero-content { max-width: 390px; padding-top: 24px; margin-inline: auto; text-align: left; }
}

@media (width >= 64rem) {
  .hero { padding-top: 0; }
  .hero-picture { position: absolute; inset: 0 auto 0 0; width: calc(50% - 110px); height: 100%; }
  .hero-inner { display: flex; min-height: 736px; align-items: center; justify-content: flex-end; }
  .hero-content { width: calc(100% - 475px); max-width: none; margin: 0; padding-top: 0; }
}
</style>
