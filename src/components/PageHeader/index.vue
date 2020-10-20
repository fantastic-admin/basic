<template>
    <div class="header">
        <div>
            <div class="title">{{ title }}</div>
            <div class="content">
                <slot name="content">{{ content }}</slot>
            </div>
        </div>
        <div>
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
        &:empty {
            display: none;
        }
    }
}
</style>
