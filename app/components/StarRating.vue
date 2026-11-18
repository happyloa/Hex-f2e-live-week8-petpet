<template>
  <span class="inline-flex items-center text-brand" role="img" aria-label="5 顆星，滿分 5 顆星">
    <AppIcon v-for="star in 5" :key="star" name="star" class="size-[1em]" />
  </span>
</template>
