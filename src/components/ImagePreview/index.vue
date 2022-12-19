<script lang="ts" setup name="ImagePreview">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: '',
  },
})

const realWidth = computed(() => {
  return typeof props.width === 'string' ? props.width : `${props.width}px`
})

const realHeight = computed(() => {
  return typeof props.height === 'string' ? props.height : `${props.height}px`
})
</script>

<template>
  <el-image :src="src" fit="cover" :style="`width:${realWidth};height:${realHeight};`" :preview-src-list="[src]" preview-teleported>
    <template #error>
      <div class="image-slot">
        <el-icon>
          <svg-icon name="image-load-fail" />
        </el-icon>
      </div>
    </template>
  </el-image>
</template>

<style lang="scss" scoped>
.el-image {
  border-radius: 5px;
  background-color: var(--el-fill-color);
  box-shadow: var(--el-box-shadow-light);
  transition: background-color 0.3s, var(--el-transition-box-shadow);

  :deep(.el-image__inner) {
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }

  :deep(.image-slot) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 30px;
  }
}
</style>
