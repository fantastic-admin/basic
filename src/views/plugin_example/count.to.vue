<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { CountTo } from 'vue3-count-to'
import Alert from './components/alert.vue'

const countToRef = ref()
const form = ref({
  startVal: 0,
  endVal: 2017,
  duration: 4000,
  decimals: 0,
  separator: ',',
  prefix: '¥ ',
  suffix: ' 元',
})

function start() {
  countToRef.value.start()
}
function pause() {
  countToRef.value.pauseResume()
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="计数器">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add vue3-count-to</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/xiaofan9/vue-count-to')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 vue-count-to
      </ElButton>
    </PageHeader>
    <PageMain>
      <CountTo ref="countToRef" class="count-to" :start-val="form.startVal" :end-val="form.endVal" :duration="form.duration" :decimals="form.decimals" :separator="form.separator" :prefix="form.prefix" :suffix="form.suffix" :autoplay="false" />
      <ElForm :model="form" size="default" label-width="80px" style="width: 300px;">
        <ElFormItem label="startVal">
          <ElInputNumber v-model="form.startVal" />
        </ElFormItem>
        <ElFormItem label="endVal">
          <ElInputNumber v-model="form.endVal" />
        </ElFormItem>
        <ElFormItem label="duration">
          <ElInputNumber v-model="form.duration" />
        </ElFormItem>
        <ElFormItem label="decimals">
          <ElInputNumber v-model="form.decimals" />
        </ElFormItem>
        <ElFormItem label="separator">
          <ElInput v-model="form.separator" />
        </ElFormItem>
        <ElFormItem label="prefix">
          <ElInput v-model="form.prefix" />
        </ElFormItem>
        <ElFormItem label="suffix">
          <ElInput v-model="form.suffix" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="start">
            开始
          </ElButton>
          <ElButton @click="pause">
            暂停
          </ElButton>
        </ElFormItem>
      </ElForm>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.count-to {
  display: inline-block;
  margin-bottom: 20px;
  font-size: 60px;
  color: #f6416c;
}
</style>
