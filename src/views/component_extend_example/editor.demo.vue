<route>
{
    meta: {
        enabled: false
    }
}
</route>

<script setup>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const content1 = ref('<h1>Fantastic-admin</h1>')
const content2 = ref('# Fantastic-admin')

const mdContent2 = computed(() => {
    const mdit = mavonEditor.getMarkdownIt()
    return mdit.render(content2.value)
})
</script>

<template>
    <div>
        <page-main title="富文本编辑器">
            <editor v-model="content1" />
            <div class="preview" v-html="content1" />
        </page-main>
        <page-main title="markdown 编辑器">
            <mavon-editor v-model="content2" style="z-index: 9;" />
            <div class="preview" v-html="mdContent2" />
        </page-main>
    </div>
</template>

<style lang="scss" scoped>
.preview {
    margin-top: 10px;
    &::before {
        content: "预览：";
        display: block;
    }
}
</style>
