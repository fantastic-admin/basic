<template>
  <VDropdown :show-triggers="['hover']" :hide-triggers="['hover']" :auto-hide="false" :popper-triggers="['hover']" :delay="200" v-bind="$attrs">
    <slot />
    <template #popper>
      <slot name="dropdown" />
    </template>
  </VDropdown>
</template>
