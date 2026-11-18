<script setup lang="ts">
import { demoReservationDates } from '~/composables/useBooking'
import { asset, services, type PetId, type ServiceId } from '~/data/petpet'

const { selection, save, close } = useBooking()
const { isSignedIn } = useMember()
const dialog = ref<HTMLDialogElement>()
const step = ref(0)
const service = ref<ServiceId>('boarding')
const start = ref(demoReservationDates.start)
const end = ref(demoReservationDates.end)
const count = ref(1)
const pet = ref<PetId>('cat')
const age = ref(1)
const contact = ref({ petName: '', ownerName: '', email: '', phone: '' })
const stepTitle = computed(() => ['預約項目', '預約資料', '付款資訊', '預約成功!'][step.value])
let opener: HTMLElement | null = null

watch(selection, async (booking) => {
  if (!booking) {
    if (dialog.value?.open) dialog.value.close()
    opener?.focus()
    return
  }
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  step.value = 0
  service.value = booking.service
  start.value = booking.start
  end.value = booking.end
  count.value = 1
  age.value = 1
  pet.value = booking.pet
  contact.value = { petName: '', ownerName: '', email: '', phone: '' }
  await nextTick()
  if (!dialog.value?.open) dialog.value?.showModal()
})

watch(step, async () => {
  await nextTick()
  dialog.value?.querySelector<HTMLElement>('#booking-heading')?.focus()
})

function next() {
  if (step.value < 2) {
    step.value++
    return
  }
  if (!selection.value) return
  save({
    sitter: selection.value.sitter.name,
    service: services.find(item => item.id === service.value)?.short ?? '寄宿',
    start: start.value,
    end: end.value,
    count: count.value,
    pet: contact.value.petName,
  })
  contact.value = { petName: '', ownerName: '', email: '', phone: '' }
  step.value = 3
}

function goBack() {
  if (step.value === 0) close()
  else step.value--
}

async function goToMember() {
  isSignedIn.value = true
  close()
  await navigateTo('/member?tab=reservations#reservations')
}
</script>

<template>
  <dialog ref="dialog" class="booking-dialog" aria-labelledby="booking-heading" :data-step="step" @cancel.prevent="close"
    @click.self="close">
    <div v-if="selection" class="booking-frame relative w-full rounded-ui bg-panel shadow-card">
      <button type="button" class="absolute top-2 right-2 grid size-8 place-items-center rounded-ui text-muted hover:bg-field"
        aria-label="關閉預約" @click="close"><AppIcon name="close" class="size-5" /></button>
      <div v-if="step === 3" class="grid min-h-[inherit] place-content-center px-6 py-12 text-center">
        <AppIcon name="pets" class="mx-auto size-16 text-brand" />
        <h2 id="booking-heading" tabindex="-1" class="mt-4 text-lead font-bold">{{ stepTitle }}</h2>
        <p class="mt-3">您可以在會員頁找到您的預約資料並修改或取消預約。</p>
        <button type="button" class="button button-primary mx-auto mt-9 w-full max-w-[350px] text-label" @click="goToMember">前往會員頁</button>
      </div>
      <form v-else class="booking-form" @submit.prevent="next">
        <BookingProgress :current="step" class="booking-progress" />
        <h2 id="booking-heading" tabindex="-1" class="booking-heading text-lead font-bold">{{ stepTitle }}</h2>
        <aside class="booking-sitter flex items-center gap-3 tablet:gap-gutter desktop:block">
          <img :src="asset(selection.sitter.image)" alt="" class="size-[100px] rounded-ui object-cover tablet:size-[150px] desktop:h-auto desktop:w-full desktop:aspect-square">
          <div class="min-w-0 desktop:mt-2">
            <p class="flex flex-wrap items-center gap-x-2 text-label font-bold">{{ selection.sitter.name }} <StarRating class="text-lead" /></p>
            <p class="mt-1 flex items-start gap-2">
              <AppIcon name="place" class="size-5 text-action" />
              {{ selection.sitter.city }}{{ selection.sitter.id === 'good-home' ? '苓雅區、新興區、前鎮區' : '' }}
            </p>
          </div>
        </aside>
        <div class="booking-fields">
          <LazyBookingServiceFields v-if="step === 0" v-model:service="service" v-model:start="start" v-model:end="end"
            v-model:count="count" v-model:pet="pet" v-model:age="age" :sitter="selection.sitter" />
          <BookingContactFields v-else-if="step === 1" v-model="contact" />
          <BookingPaymentFields v-else />
        </div>
        <div class="booking-actions grid content-end gap-2 text-center tablet:ml-auto desktop:w-full">
          <button v-if="step > 0" type="button" class="min-h-8 text-action-text hover:underline" @click="goBack">返回</button>
          <button v-else type="button" class="min-h-8 text-action-text hover:underline tablet:hidden" @click="close">返回</button>
          <button class="button button-primary w-full text-label">{{ step === 2 ? '確認預約' : '下一步' }}</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.booking-dialog {
  position: fixed;
  inset: 62px 0 0;
  width: 100%;
  height: calc(100% - 62px);
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 16px 15px;
  color: var(--color-ink);
  background: transparent;
}
.booking-dialog[open] { display: grid; align-content: safe center; justify-items: center; overflow: auto; }
.booking-dialog::backdrop { background: linear-gradient(transparent 62px, var(--color-overlay) 62px); }
.booking-frame { max-width: 690px; min-height: min(670px, calc(100dvh - 94px)); }
.booking-dialog[open] .booking-frame { animation: dialog-enter 180ms ease both; }
.booking-form {
  display: grid;
  min-height: inherit;
  grid-template-areas: 'progress' 'heading' 'sitter' 'fields' 'actions';
  grid-template-rows: auto auto auto 1fr auto;
  gap: 12px;
  padding: 20px 24px;
}
.booking-heading { grid-area: heading; }
.booking-progress { grid-area: progress; }
.booking-sitter { grid-area: sitter; }
.booking-fields { grid-area: fields; margin-block: 8px 4px; }
.booking-actions { grid-area: actions; }
@media (width >= 48rem) {
  .booking-dialog { inset-block-start: 64px; height: calc(100% - 64px); }
  .booking-dialog::backdrop { background: linear-gradient(transparent 64px, var(--color-overlay) 64px); }
  .booking-frame { min-height: min(840px, calc(100dvh - 110px)); }
  .booking-form {
    grid-template-areas: 'heading' 'sitter' 'fields' 'progress' 'actions';
    grid-template-rows: auto auto 1fr auto auto;
    gap: 18px;
    padding: 60px 60px 48px;
  }
}
@media (48rem <= width < 64rem) {
  .booking-dialog[data-step='2'] .booking-sitter { display: none; }
  .booking-dialog[data-step='2'] .booking-form {
    grid-template-areas: 'heading' 'fields' 'progress' 'actions';
    grid-template-rows: auto 1fr auto auto;
  }
  .booking-actions { grid-auto-flow: column; align-items: center; gap: 30px; margin-block-start: 14px; }
  .booking-actions .button-primary { width: 270px; }
}
@media (width >= 64rem) {
  .booking-dialog { padding-bottom: 52px; }
  .booking-dialog[data-step='0']::backdrop { background: linear-gradient(transparent 64px, #000 64px); }
  .booking-frame { max-width: 920px; min-height: min(580px, calc(100dvh - 95px)); }
  .booking-form {
    grid-template-areas: 'heading sitter' 'fields sitter' 'progress actions';
    grid-template-columns: minmax(0, 1fr) 282px;
    grid-template-rows: auto 1fr auto;
    gap: 20px 28px;
    padding: 60px 30px 48px;
  }
}
@keyframes dialog-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
