export default function useViewTransition(callback: () => void) {
  function startViewTransition() {
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      callback()
      return
    }
    return document.startViewTransition(async () => {
      await Promise.resolve(callback())
    })
  }

  return {
    startViewTransition,
  }
}
