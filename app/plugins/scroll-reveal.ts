export default defineNuxtPlugin(({ vueApp }) => {
  if (import.meta.server) {
    vueApp.directive('reveal', {})
    return
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue

      const element = entry.target
      observer.unobserve(element)

      if (reducedMotion.matches) continue

      const animation = element.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 500, easing: 'ease-out' })
      animation.id = 'scroll-reveal'
    }
  }, { threshold: 0.12 })

  vueApp.directive<HTMLElement>('reveal', {
    mounted(element) {
      if (!reducedMotion.matches && element.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(element)
      }
    },
    unmounted(element) {
      observer.unobserve(element)
    },
  })
})
