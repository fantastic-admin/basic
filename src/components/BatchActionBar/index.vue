<template>
    <div class="batch-action-bar">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" :disabled="!data.length">当页全选</el-checkbox>
        <div v-if="selectionData.length" class="tips">已选 {{ selectionData.length }} 项</div>
        <el-form :disabled="!selectionData.length">
            <slot />
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'BatchActionBar',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        selectionData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {}
    },
    computed: {
        checkAll: {
            get: function() {
                let flag = false
                if (this.data.length != 0 && this.data.length == this.selectionData.length) {
                    flag = true
                }
                return flag
            },
            set: function(newVal) {
                newVal ? this.$emit('check-all') : this.$emit('check-null')
            }
        },
        isIndeterminate() {
            let flag = false
            if (this.selectionData.length > 0 && this.selectionData.length < this.data.length) {
                flag = true
            }
            return flag
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

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
    ::v-deep .el-form {
        > .el-button {
            margin-right: 10px;
        }
        > .el-button-group {
            margin-right: 10px;
        }
    }
}
</style>
