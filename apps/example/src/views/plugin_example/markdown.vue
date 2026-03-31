<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import gfmLocale from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
// @ts-expect-error 忽略警告
import { Editor, Viewer } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import Alert from './components/alert.vue'
import Command from './components/command.vue'
import 'bytemd/dist/index.css'

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
    <FaPageHeader title="Markdown 编辑器">
      <template #description>
        <Command text="pnpm add bytemd @bytemd/vue-next @bytemd/plugin-gfm" />
      </template>
      <FaButton variant="outline" size="icon" @click="open('https://github.com/bytedance/bytemd')">
        <FaIcon name="i-simple-icons:github" />
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <div class="min-w-full prose">
        <Editor :value="content" :plugins="plugins" :locale="zhHans" @change="handleChange" />
      </div>
    </FaPageMain>
    <FaPageMain title="预览">
      <div class="min-w-full prose">
        <Viewer :value="content" />
      </div>
    </FaPageMain>
  </div>
</template>

<style scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}
</style>
