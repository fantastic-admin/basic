<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { Editor, Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import Alert from './components/alert.vue'

const content = ref('# Fantastic-admin')

const plugins = [
  gfm({
    locale: gfmLocale,
  }),
]

function handleChange(v: string) {
  content.value = v
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="Markdown 编辑器">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add bytemd @bytemd/vue-next @bytemd/plugin-gfm</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/bytedance/bytemd')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 bytemd
      </ElButton>
    </PageHeader>
    <PageMain>
      <Editor :value="content" :plugins="plugins" :locale="zhHans" @change="handleChange" />
      <Viewer :value="content" />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}
</style>
