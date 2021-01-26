<template>
    <div>
        <page-main title="富文本编辑器">
            <editor v-model="form.content" />
            <div class="preview" v-html="form.content" />
        </page-main>
        <page-main title="markdown 编辑器">
            <mavon-editor v-model="form.content2" style="z-index: 9;" />
            <div class="preview" v-html="mdContent" />
        </page-main>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    name: 'ComponentExampleEditor',
    components: {
        mavonEditor
    },
    data() {
        return {
            form: {
                content: '<h1>Fantastic-admin</h1>',
                content2: '# Fantastic-admin'
            }
        }
    },
    computed: {
        mdContent() {
            const mdit = mavonEditor.getMarkdownIt()
            return mdit.render(this.form.content2)
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
