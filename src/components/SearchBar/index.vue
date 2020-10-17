<template>
    <div class="search-container">
        <slot />
        <div v-if="showMore" class="more">
            <el-button type="text" size="small" :icon="isOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click="toggle">{{ isOpen ? '收起' : '展开' }}</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        showMore: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen
            this.$emit('toggle', this.isOpen)
        }
    }
}
</script>

<style lang="scss" scoped>
.search-container {
    position: relative;
    margin: 20px 0;
    padding: 20px;
    background-color: #f7f8fa;
    &:first-child {
        margin-top: 0;
    }
    ::v-deep .el-form {
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
    }
}
</style>
