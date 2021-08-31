<template>
    <div>
        <page-main title="富文本编辑器">
            <editor v-model="form.content" />
            <div class="preview" v-html="form.content" />
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'ComponentExampleEditor',
    data() {
        return {
            form: {
                content: '<h1>Fantastic-admin</h1>'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.preview {
    margin-top: 10px;
    &::before {
        content: '预览：';
        display: block;
    }
}
</style>
