<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import VueEsign from 'vue-esign'
import Alert from './components/alert.vue'

defineOptions({
  name: 'ComponentExampleSignCanvas',
})

const esignRef = ref()
const options = ref({
  lineWidth: 6,
  lineColor: '#000000',
  bgColor: '#f0f0f0',
  isCrop: false,
})
const result = ref('')

function handleReset() {
  esignRef.value.reset()
  nextTick(() => {
    options.value.bgColor = '#f0f0f0'
  })
}
function handleGenerate() {
  esignRef.value.generate().then((res: string) => {
    result.value = res
  }).catch(() => {
    ElMessage('画板为空，无法生成图片')
  })
}
function handleDownload() {
  esignRef.value.generate().then((res: string) => {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = () => {
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = Date.parse(new Date().toString()).toString()
      a.href = image.src
      a.dispatchEvent(event)
    }
    image.src = res
  })
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="电子签名">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add vue-esign</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/JaimeCheng/vue-esign')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 vue-esign
      </ElButton>
    </PageHeader>
    <PageMain>
      <VueEsign ref="esignRef" v-model:bgColor="options.bgColor" :width="500" :height="300" :is-crop="options.isCrop" :line-width="options.lineWidth" :line-color="options.lineColor" />
      <div>
        <ElButton @click="handleReset">
          清空画板
        </ElButton>
        <ElButton @click="handleGenerate">
          生成图片
        </ElButton>
        <ElButton @click="handleDownload">
          下载图片
        </ElButton>
      </div>
      <img v-if="result" :src="result" :width="500" :height="300">
    </PageMain>
  </div>
</template>
