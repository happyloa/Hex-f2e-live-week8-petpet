<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{ label: string; min?: string; small?: boolean }>()
const date = defineModel<string>({ required: true })
const format = 'yyyy-MM-dd'
const menuId = useId()
const ready = ref(false)
const menuOpen = ref(false)
const floating = { strategy: 'fixed', shift: { crossAxis: true, padding: 8 } } as const

onMounted(() => { ready.value = true })

function handleEscape(event: KeyboardEvent) {
  // Let the picker handle Escape without also cancelling the native booking dialog.
  if (menuOpen.value) event.preventDefault()
}

const dateLabel = new Intl.DateTimeFormat('zh-TW', { dateStyle: 'full' })
const ariaLabels = computed(() => ({
  input: props.label,
  menu: '選擇日期',
  prevMonth: '上一個月',
  nextMonth: '下一個月',
  day: ({ value }: { value: Date }) => dateLabel.format(value),
}))
</script>

<template>
  <VueDatePicker v-model="date" :model-type="format" :menu-id="menuId" :formats="{ input: format, month: 'M 月', year: 'yyyy 年' }"
    :min-date="min || undefined" :time-config="{ enableTimePicker: false }"
    :input-attrs="{ clearable: false, inputmode: 'none', hideInputIcon: true }"
    :aria-labels="ariaLabels" :aria-busy="!ready" :disabled="!ready"
    :floating="floating" @open="menuOpen = true" @closed="menuOpen = false"
    @keydown.esc.capture="handleEscape"
    :week-start="0" :day-names="['日', '一', '二', '三', '四', '五', '六']"
    :config="{ monthChangeOnScroll: false }"
    :placeholder="format.toUpperCase()" auto-apply arrow-navigation
    class="petpet-date min-w-0" :class="{ 'petpet-date-small': small }" />
</template>

<style scoped>
.petpet-date.petpet-date, .petpet-date :deep(.dp--theme-light) {
  --dp-font-family: var(--font-sans);
  --dp-background-color: white;
  --dp-text-color: var(--color-ink);
  --dp-hover-color: color-mix(in srgb, var(--color-brand) 20%, white);
  --dp-primary-color: var(--color-action);
  --dp-border-color: var(--color-field);
  --dp-border-color-focus: var(--color-action);
  --dp-menu-border-color: var(--color-field);
  --dp-border-radius: var(--radius-ui);
  --dp-cell-border-radius: var(--radius-ui);
}

.petpet-date :deep(.dp--input) {
  height: var(--spacing-control);
  padding: 0 28px 0 12px;
  color: var(--color-muted);
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='5' width='18' height='16' rx='2'/%3E%3Cpath d='M3 10h18M8 3v4m8-4v4'/%3E%3C/svg%3E") right 9px center no-repeat;
}

.petpet-date :deep(.dp--input:disabled) {
  cursor: wait;
  background-color: var(--color-panel);
}
.petpet-date-small :deep(.dp--input) { height: var(--spacing-control-small); }
.petpet-date :deep(.dp--menu) { box-shadow: var(--shadow-card); }
@media (height < 24rem) {
  .petpet-date :deep(.dp--menu) {
    max-height: calc(100dvh - 1rem);
    overflow-y: auto;
  }
}
</style>
