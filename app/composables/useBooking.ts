import type { ServiceId, Sitter } from '~/data/petpet'

interface BookingSelection {
  sitter: Sitter
  service?: ServiceId
  start?: string
  end?: string
  pet?: string
}

export interface Reservation {
  id: string
  sitter: string
  service: string
  start: string
  end: string
  count: number
  pet: string
}

export function useBooking() {
  const selection = useState<BookingSelection | null>('booking-selection', () => null)
  const reservations = useState<Reservation[]>('reservations', () => [])

  function open(sitter: Sitter, initial: Omit<BookingSelection, 'sitter'> = {}) {
    selection.value = { sitter, ...initial }
  }

  function close() {
    selection.value = null
  }

  function save(reservation: Omit<Reservation, 'id'>) {
    reservations.value = [{ ...reservation, id: crypto.randomUUID() }, ...reservations.value]
  }

  function cancel(id: string) {
    reservations.value = reservations.value.filter((reservation) => reservation.id !== id)
  }

  return { selection, reservations, open, close, save, cancel }
}
