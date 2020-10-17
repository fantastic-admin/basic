<template>
    <div class="header">
        <div>
            <div class="title">{{ title }}</div>
            <div v-if="content" class="content">{{ content }}</div>
        </div>
        <div v-if="$slots.default">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 16px 20px;
    background: #fff;
    border-bottom: 1px solid #e8eaec;
    .title {
        font-size: 22px;
    }
    .content {
        color: #909399;
        font-size: 14px;
        margin-top: 10px;
    }
}
</style>
