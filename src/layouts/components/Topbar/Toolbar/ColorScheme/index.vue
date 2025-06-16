<script setup lang="ts">
defineOptions({
  name: 'ColorScheme',
})

const settingsStore = useSettingsStore()

function toggleColorScheme(event: MouseEvent) {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    settingsStore.currentColorScheme && settingsStore.setColorScheme(settingsStore.currentColorScheme === 'dark' ? 'light' : 'dark')
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    settingsStore.currentColorScheme && settingsStore.setColorScheme(settingsStore.currentColorScheme === 'dark' ? 'light' : 'dark')
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: settingsStore.currentColorScheme === 'light' ? clipPath : clipPath.reverse(),
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: settingsStore.currentColorScheme === 'light' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    )
  })
}
</script>

<template>
  <FaButton variant="ghost" size="icon" class="size-9" @click="toggleColorScheme">
    <FaIcon
      :name="{
        light: 'i-ri:sun-line',
        dark: 'i-ri:moon-line',
      }[settingsStore.currentColorScheme!]" class="size-4"
    />
  </FaButton>
</template>
