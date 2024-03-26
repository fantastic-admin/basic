<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import { useRequest } from 'vue-hooks-plus'
import Alert from './components/alert.vue'

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(String(Date.now()))
    }, 1000)
  })
}

const time = ref(900)

const computedTime = computed(() => time.value + 100)

const { data, run, loading, cancel } = useRequest(() => getUsername(), {
  manual: true,
  pollingInterval: computedTime,
  pollingWhenHidden: false,
})

function start() {
  run()
}

function update() {
  time.value += 100
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="VueHooks Plus">
      <template #content>
        <p>提供基础和高级的 hook ，高性能逻辑的抽象封装，满足大量场景，更多 API 和例子请查看 VueHooks Plus 官网。</p>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add vue-hooks-plus</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/InhiblabCore/vue-hooks-plus')">
        <template #icon>
          <SvgIcon name="i-ep:link" />
        </template>
        访问 VueHooks Plus
      </ElButton>
    </PageHeader>
    <PageMain title="轮询">
      <div class="mb-4">
        Data：<span>{{ loading ? 'loading' : data }}</span>
      </div>
      <div class="mb-4">
        PollingInterval：{{ computedTime }}ms
      </div>
      <div>
        <el-button @click="start()">
          Start
        </el-button>
        <el-button @click="update()">
          time + 100ms
        </el-button>
        <el-button @click="cancel()">
          Stop
        </el-button>
      </div>
    </PageMain>
  </div>
</template>
