import type { Reservation } from '~/composables/useBooking'
import { demoLoginStorageKey } from '~/composables/useMember'

const reservationStorageKey = 'petpet-reservations'

function isReservation(entry: unknown): entry is Reservation {
  if (!entry || typeof entry !== 'object') return false
  const value = entry as Partial<Reservation>
  return typeof value.id === 'string'
    && typeof value.sitter === 'string'
    && typeof value.service === 'string'
    && typeof value.start === 'string'
    && typeof value.end === 'string'
    && typeof value.pet === 'string'
    && typeof value.count === 'number'
    && Number.isInteger(value.count)
    && value.count > 0
}

export default defineNuxtPlugin((nuxtApp) => {
  const { isSignedIn } = useMember()
  const { reservations } = useBooking()

  nuxtApp.hook('app:mounted', () => {
    try {
      if (localStorage.getItem(demoLoginStorageKey) === 'true') isSignedIn.value = true
    } catch { /* The demo still works when browser storage is unavailable. */ }

    try {
      const saved = sessionStorage.getItem(reservationStorageKey)
      const records: unknown = saved ? JSON.parse(saved) : []
      if (Array.isArray(records)) reservations.value = records.filter(isReservation)
    } catch { /* Malformed data leaves the current in-memory reservations available. */ }

    watch(reservations, (value) => {
      try {
        sessionStorage.setItem(reservationStorageKey, JSON.stringify(value))
      } catch { /* Keep in-memory reservations available. */ }
    }, { deep: true })

    watch(isSignedIn, (active) => {
      if (!active) {
        try {
          localStorage.removeItem(demoLoginStorageKey)
        } catch { /* The in-memory login state is already cleared. */ }
      }
    })
  })
})
