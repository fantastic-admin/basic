<script lang="ts" setup name="SearchBar">
const props = defineProps({
  fold: {
    type: Boolean,
    default: true,
  },
  showToggle: {
    type: Boolean,
    default: true,
  },
  background: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'update:fold', value: boolean): void
  (event: 'toggle', value: boolean): void
}>()

const isFold = ref(props.fold)

watch(() => props.fold, (value) => {
  isFold.value = value
  emit('update:fold', value)
})

function toggle() {
  isFold.value = !isFold.value
  emit('toggle', isFold.value)
}
</script>

<template>
  <div class="search-container" :class="{ 'has-bg': background }">
    <slot :fold="isFold" />
    <div v-if="showToggle" class="toggle">
      <el-button text size="small" @click="toggle">
        <template #icon>
          <el-icon>
            <svg-icon :name="isFold ? 'ep:caret-bottom' : 'ep:caret-top' " />
          </el-icon>
        </template>
        {{ isFold ? '展开' : '收起' }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;

  &.has-bg {
    padding: 20px;
    background-color: var(--el-fill-color-lighter);
    transition: background-color 0.3s;
  }

  :deep(.el-form) {
    margin-bottom: -10px;

    .el-select {
      width: 100%;
    }

    .el-date-editor {
      width: 100%;
    }
  }

  .toggle {
    position: relative;
    text-align: center;
    margin-bottom: -10px;
  }
}
</style>
