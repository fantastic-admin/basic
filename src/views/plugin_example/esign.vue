<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import VueEsign from 'vue-esign'
import { toast } from 'vue-sonner'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

defineOptions({
  name: 'ComponentExampleSignCanvas',
})

const esignRef = useTemplateRef<any>('esignRef')
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
    toast.warning('画板为空，无法生成图片')
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
    <FaPageHeader title="电子签名">
      <template #description>
        <p>
          安装命令：
          <Command text="pnpm add vue-esign" />
        </p>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/JaimeCheng/vue-esign')">
        <FaIcon name="i-ep:link" />
        访问 vue-esign
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <div class="space-y-2">
        <VueEsign ref="esignRef" v-model:bg-color="options.bgColor" :width="500" :height="300" :is-crop="options.isCrop" :line-width="options.lineWidth" :line-color="options.lineColor" />
        <div class="space-x-2">
          <FaButton @click="handleReset">
            清空画板
          </FaButton>
          <FaButton @click="handleGenerate">
            生成图片
          </FaButton>
          <FaButton @click="handleDownload">
            下载图片
          </FaButton>
        </div>
        <img v-if="result" :src="result" :width="500" :height="300">
      </div>
    </FaPageMain>
  </div>
</template>
