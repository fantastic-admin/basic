<script lang="ts" setup name="BatchActionBar">
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  selectionData: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['checkAll', 'checkNull'])

const checkAll = computed({
  get() {
    let flag = false
    if (props.data.length !== 0 && props.data.length === props.selectionData.length) {
      flag = true
    }
    return flag
  },
  set(newVal) {
    newVal ? emit('checkAll') : emit('checkNull')
  },
})

const isIndeterminate = computed(() => {
  let flag = false
  if (props.selectionData.length > 0 && props.selectionData.length < props.data.length) {
    flag = true
  }
  return flag
})
</script>

<template>
  <div class="batch-action-bar">
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" :disabled="!data.length">
      当页全选
    </el-checkbox>
    <div v-if="selectionData.length" class="tips">
      已选 {{ selectionData.length }} 项
    </div>
    <el-form :disabled="!selectionData.length">
      <slot />
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.batch-action-bar {
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 0 10px;

  &:first-child {
    margin-top: 0;
  }

  .el-checkbox {
    margin-right: 20px;
  }

  .tips {
    margin-right: 20px;
    color: #909399;
    font-size: 13px;
  }

  :deep(.el-form) {
    > .el-button {
      margin-right: 10px;
    }

    > .el-button-group {
      margin-right: 10px;
    }
  }
}
</style>
