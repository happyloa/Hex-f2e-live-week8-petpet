import type { PetId, ServiceId, Sitter } from '~/data/petpet'

export interface BookingOptions {
  service?: ServiceId
  start?: string
  end?: string
  pet?: string
}

interface BookingSelection {
  sitter: Sitter
  service: ServiceId
  start: string
  end: string
  pet: PetId
}

export const demoReservationDates = { start: '2020-11-20', end: '2020-11-21' }

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

  function open(sitter: Sitter, options: BookingOptions = {}) {
    const start = options.start || demoReservationDates.start
    const end = options.end || demoReservationDates.end
    selection.value = {
      sitter,
      start,
      end: end < start ? start : end,
      service: sitter.services.find(id => id === options.service) ?? sitter.services[0],
      pet: sitter.pets.find(id => id === options.pet) ?? sitter.pets[0],
    }
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
