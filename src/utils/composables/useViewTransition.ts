export default function useViewTransition(callback: () => void) {
  function startViewTransition() {
    // @ts-expect-error: View Transition API
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      callback()
      return
    }
    // @ts-expect-error: View Transition API
    return document.startViewTransition(async () => {
      await Promise.resolve(callback())
    })
  }

  return {
    startViewTransition,
  }
}
