<script setup lang="ts">
defineOptions({
  name: 'Trend',
})

const props = withDefaults(
  defineProps<{
    value: string
    type?: 'up' | 'down'
    prefix?: string
    suffix?: string
    reverse?: boolean
  }>(),
  {
    type: 'up',
    prefix: '',
    suffix: '',
    reverse: false,
  },
)

const isUp = computed(() => {
  let isUp = props.type === 'up'
  if (props.reverse) {
    isUp = !isUp
  }
  return isUp
})
</script>

<template>
  <div :class="`trend ${isUp ? 'up' : 'down'}`">
    <span v-if="prefix" class="prefix">{{ prefix }}</span>
    <span class="text">{{ value }}</span>
    <span v-if="suffix" class="suffix">{{ suffix }}</span>
    <svg-icon name="ep:caret-top" />
  </div>
</template>

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  transition: var(--el-transition-color);

  &.up {
    color: var(--el-color-success);
  }

  &.down {
    color: var(--el-color-danger);

    .icon {
      transform: rotate(180deg);
    }
  }

  .icon {
    margin-left: 5px;
    transition: transform 0.3s;
  }
}
</style>
