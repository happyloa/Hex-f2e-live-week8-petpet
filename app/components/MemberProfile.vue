<script setup lang="ts">
import { asset } from '~/data/petpet'

const { profile } = useMember()
const isEditing = ref(false)
const draft = reactive({ ...profile.value })
const fields = [
  { key: 'email', label: '電子信箱', type: 'email' },
  { key: 'phone', label: '聯絡電話', type: 'tel' },
  { key: 'gender', label: '性別', type: 'text' },
  { key: 'address', label: '聯絡地址', type: 'text' },
] as const

function edit() {
  Object.assign(draft, profile.value)
  isEditing.value = true
}

function save() {
  profile.value = { ...draft }
  isEditing.value = false
}
</script>

<template>
  <section>
    <div class="flex items-center gap-2">
      <h1 class="text-heading font-bold">會員資料</h1>
      <button type="button" aria-label="編輯會員資料" :aria-expanded="isEditing" @click="edit">
        <AppIcon name="edit" class="size-5" />
      </button>
    </div>
    <div class="mt-9 flex items-center tablet:mt-7 gap-4">
      <img :src="asset('person-5.png')" alt="" width="96" height="96" class="size-[76px] rounded-full tablet:size-24">
      <p class="text-label font-medium">{{ profile.name }}</p>
    </div>
    <form v-if="isEditing" class="mt-7 grid max-w-sm gap-3" @submit.prevent="save">
      <label class="grid gap-1">姓名<input v-model.trim="draft.name" class="field field-small" required></label>
      <label v-for="field in fields" :key="field.key" class="grid gap-1">
        {{ field.label }}
        <input v-model.trim="draft[field.key]" :type="field.type" class="field field-small" required>
      </label>
      <div class="grid grid-cols-2 gap-4">
        <button type="button" class="button button-outline" @click="isEditing = false">取消</button>
        <button class="button button-primary">儲存</button>
      </div>
    </form>
    <dl v-else class="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-5 desktop:gap-x-8">
      <template v-for="field in fields" :key="field.key">
        <dt class="text-form">{{ field.label }}</dt>
        <dd>{{ profile[field.key] }}</dd>
      </template>
    </dl>
  </section>
</template>
