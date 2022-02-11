<script setup name="Result">
defineProps({
    type: {
        type: String,
        validator: val => ['success', 'warning', 'error'].includes(val),
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div class="result">
        <div v-if="type === 'success'" class="icon icon-success">
            <el-icon><el-icon-success-filled /></el-icon>
        </div>
        <div v-else-if="type === 'warning'" class="icon icon-warning">
            <el-icon><el-icon-warning-filled /></el-icon>
        </div>
        <div v-else class="icon icon-error">
            <el-icon><el-icon-circle-close-filled /></el-icon>
        </div>
        <h1>{{ title }}</h1>
        <div v-if="desc" class="desc">{{ desc }}</div>
        <div v-if="$slots.extra" class="extra">
            <slot name="extra" />
        </div>
        <div v-if="$slots.default" class="actions">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
$success: #67c23a;
$warning: #e6a23c;
$error: #f56c6c;
.result {
    width: 72%;
    margin: 20px auto 0;
    text-align: center;
    .icon {
        i {
            font-size: 80px;
        }
        &-success i {
            color: $success;
        }
        &-warning i {
            color: $warning;
        }
        &-error i {
            color: $error;
        }
    }
    h1 {
        margin: 20px 0;
        font-size: 24px;
        font-weight: normal;
    }
    .desc {
        color: #909399;
        margin-bottom: 20px;
    }
    .extra {
        margin: 50px 0;
        padding: 24px 40px;
        text-align: left;
        color: #606266;
        background: #f8f8f9;
        border-radius: 4px;
    }
    .actions {
        margin-bottom: 20px;
    }
}
</style>
