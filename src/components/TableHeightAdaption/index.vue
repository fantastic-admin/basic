<template>
    <div class="adaption-container">
        <slot />
    </div>
</template>

<script setup name="TableHeightAdaption">
onMounted(() => {
    nextTick(() => {
        // 获取表头高度，然后设置 .el-table__body-wrapper 的 height
        let height = document.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
        document.getElementsByClassName('el-table__body-wrapper')[0].style.height = `calc(100% - ${height}px)`
    })
})
</script>

<style lang="scss" scoped>
.adaption-container {
    height: 100%;
    overflow: auto;
    :deep(.el-table) {
        height: 100%;
        .el-table__body-wrapper {
            overflow-y: auto;
        }
    }
}
</style>
