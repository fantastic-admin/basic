<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import Alert from './components/alert.vue'
import '@vue-office/docx/lib/index.css'
import '@vue-office/excel/lib/index.css'

const docx = new URL('./files/test.docx', import.meta.url).href
const excel = new URL('./files/test.xlsx', import.meta.url).href
const pdf = new URL('./files/test.pdf', import.meta.url).href

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="文件预览">
      <template #content>
        <p>支持docx、xlsx、pdf文件预览。</p>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add @vue-office/docx @vue-office/excel @vue-office/pdf</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/501351981/vue-office')">
        <template #icon>
          <SvgIcon name="i-ep:link" />
        </template>
        访问 vue-office
      </ElButton>
    </PageHeader>
    <PageMain title="docx文件预览">
      <VueOfficeDocx :src="docx" style="height: 500px;" />
    </PageMain>
    <PageMain title="excel文件预览">
      <VueOfficeExcel :src="excel" style="height: 500px;" />
    </PageMain>
    <PageMain title="pdf文件预览">
      <VueOfficePdf :src="pdf" style="height: 500px;" />
    </PageMain>
  </div>
</template>
