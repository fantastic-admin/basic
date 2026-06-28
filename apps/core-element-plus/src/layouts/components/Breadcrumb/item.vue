<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    replace?: boolean
    separator?: string
  }>(),
  {
    separator: '/',
  },
)

const router = useRouter()

function onClick() {
  if (props.to) {
    props.replace ? router.replace(props.to) : router.push(props.to)
  }
}
</script>

<template>
  <div class="breadcrumb-item text-foreground flex items-center">
    <span class="separator mx-2">
      {{ separator }}
    </span>
    <span
      class="text opacity-60 flex items-center"
      :class="{
        'is-link cursor-pointer transition-opacity hover-opacity-100': !!props.to,
      }" @click="onClick"
    >
      <slot />
    </span>
  </div>
</template>
