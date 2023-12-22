<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Alert from './components/alert.vue'

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="拆分面板">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add splitpanes</ElTag> <ElTag>pnpm add @types/splitpanes -D</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/antoniandre/splitpanes')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 splitpanes
      </ElButton>
    </PageHeader>
    <PageMain>
      <Splitpanes class="default-theme" style="height: 400px;">
        <Pane min-size="20">
          1
        </Pane>
        <Pane>
          <Splitpanes horizontal>
            <Pane>2</Pane>
            <Pane>3</Pane>
            <Pane>4</Pane>
          </Splitpanes>
        </Pane>
        <Pane>
          5
        </Pane>
      </Splitpanes>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.splitpanes__pane {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #999;
}
</style>
