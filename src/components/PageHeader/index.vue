<script setup name="PageHeader">
defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div class="header">
        <div class="main">
            <div class="title">{{ title }}</div>
            <div class="content">
                <slot name="content">{{ content }}</slot>
            </div>
        </div>
        <div class="sub">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 16px 20px;
    background: #fff;
    border-bottom: 1px solid #e8eaec;
    .main {
        flex: 1;
        margin-right: 20px;
        .title {
            font-size: 22px;
        }
        .content {
            color: #909399;
            font-size: 14px;
            margin-top: 10px;
            &:empty {
                display: none;
            }
        }
    }
    .sub {
        flex: none;
    }
}
</style>
