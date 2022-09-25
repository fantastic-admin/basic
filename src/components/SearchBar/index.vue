<script lang="ts" setup name="SearchBar">
const props = defineProps({
  showMore: {
    type: Boolean,
    default: false,
  },
  unfold: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle'])

const isUnfold = ref(!props.unfold)

watch(() => props.unfold, () => toggle(), {
  immediate: true,
})

function toggle() {
  isUnfold.value = !isUnfold.value
  emit('toggle', isUnfold.value)
}
</script>

<template>
  <div class="search-container">
    <slot />
    <div v-if="showMore" class="more">
      <el-button text size="small" @click="toggle">
        <template #icon>
          <el-icon>
            <svg-icon :name="isUnfold ? 'ep:caret-top' : 'ep:caret-bottom'" />
          </el-icon>
        </template>
        {{ isUnfold ? '收起' : '展开' }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;
  margin: 20px 0;
  padding: 20px;
  background-color: var(--el-fill-color-lighter);
  transition: background-color 0.3s;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
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

  .more {
    position: relative;
    text-align: center;
    margin-bottom: -10px;
  }
}
</style>
