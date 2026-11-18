<script setup lang="ts">
const fields = [
  { key: 'petName', label: '毛孩姓名', placeholder: '請輸入毛孩姓名', type: 'text', autocomplete: 'off' },
  { key: 'ownerName', label: '飼主姓名', placeholder: '請輸入飼主姓名', type: 'text', autocomplete: 'name' },
  { key: 'email', label: 'Email', placeholder: 'example@gmail.com', type: 'email', autocomplete: 'email' },
  { key: 'phone', label: '聯絡電話', placeholder: '0912-345-678', type: 'tel', autocomplete: 'tel' },
] as const
const contact = defineModel<Record<typeof fields[number]['key'], string>>({ required: true })
</script>

<template>
  <div class="grid gap-5 text-form tablet:max-w-80">
    <label v-for="field in fields" :key="field.key" class="grid gap-1">
      {{ field.label }}
      <input v-model="contact[field.key]" :type="field.type" :placeholder="field.placeholder"
        :autocomplete="field.autocomplete" class="field field-small" required>
    </label>
  </div>
</template>
