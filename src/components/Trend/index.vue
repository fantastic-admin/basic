<script lang="ts" setup name="Trend">
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => 'up' | 'down',
    default: 'up',
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})

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
    <el-icon>
      <svg-icon name="ep:caret-top" />
    </el-icon>
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

    .el-icon {
      transform: rotate(180deg);
    }
  }

  .el-icon {
    margin-left: 5px;
    transition: transform 0.3s;
  }
}
</style>
