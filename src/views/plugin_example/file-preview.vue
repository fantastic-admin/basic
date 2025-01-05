<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import Alert from './components/alert.vue'
import Command from './components/command.vue'
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
    <FaPageHeader title="文件预览">
      <template #description>
        <div class="space-y-2">
          <p>支持docx、xlsx、pdf文件预览。</p>
          <p>
            安装命令：
            <Command text="pnpm add @vue-office/docx @vue-office/excel @vue-office/pdf" />
          </p>
        </div>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/501351981/vue-office')">
        <FaIcon name="i-ep:link" />
        访问 vue-office
      </FaButton>
    </FaPageHeader>
    <FaPageMain title="docx文件预览">
      <VueOfficeDocx :src="docx" style="height: 500px;" />
    </FaPageMain>
    <FaPageMain title="excel文件预览">
      <VueOfficeExcel :src="excel" style="height: 500px;" />
    </FaPageMain>
    <FaPageMain title="pdf文件预览">
      <VueOfficePdf :src="pdf" style="height: 500px;" />
    </FaPageMain>
  </div>
</template>
