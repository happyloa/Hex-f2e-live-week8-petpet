export default defineNuxtPlugin((nuxtApp) => {
  const { isSignedIn } = useMember()
  const { reservations } = useBooking()

  nuxtApp.hook('app:mounted', () => {
    try {
      if (localStorage.getItem('petpet-remember-demo') === 'true') isSignedIn.value = true
      const saved = sessionStorage.getItem('petpet-reservations')
      if (saved) reservations.value = JSON.parse(saved)

      watch(reservations, (value) => {
        try {
          sessionStorage.setItem('petpet-reservations', JSON.stringify(value))
        } catch { /* Keep in-memory reservations available. */ }
      }, { deep: true })

      watch(isSignedIn, (active) => {
        if (!active) {
          try {
            localStorage.removeItem('petpet-remember-demo')
          } catch { /* The in-memory login state is already cleared. */ }
        }
      })
    } catch { /* Demo functionality remains available in memory. */ }
  })
})
