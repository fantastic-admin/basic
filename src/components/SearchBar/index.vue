<script setup name="SearchBar">
const props = defineProps({
    showMore: {
        type: Boolean,
        default: false
    },
    unfold: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggle'])

const isUnfold = ref(!props.unfold)

watch(() => props.unfold, () => toggle(), {
    immediate: true
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
            <el-button type="text" size="small" :icon="isUnfold ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click="toggle">{{ isUnfold ? '收起' : '展开' }}</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-container {
    position: relative;
    margin: 20px 0;
    padding: 20px;
    background-color: #f7f8fa;
    &:first-child {
        margin-top: 0;
    }
    :deep(.el-form) {
        margin-bottom: -18px;
        .el-select {
            width: 100%;
        }
        .el-date-editor {
            width: 100%;
        }
    }
    .more {
        text-align: center;
        margin-bottom: -10px;
    }
}
</style>
