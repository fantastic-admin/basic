<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

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
    <FaPageHeader title="VueHooks Plus">
      <template #description>
        <div class="space-y-2">
          <p>提供基础和高级的 hook ，高性能逻辑的抽象封装，满足大量场景，更多 API 和例子请查看 VueHooks Plus 官网。</p>
          <p>
            安装命令：
            <Command text="pnpm add vue-hooks-plus" />
          </p>
        </div>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/InhiblabCore/vue-hooks-plus')">
        <FaIcon name="i-ep:link" />
        访问 VueHooks Plus
      </FaButton>
    </FaPageHeader>
    <FaPageMain title="轮询">
      <div class="space-y-2">
        <div>
          Data：<span>{{ loading ? 'loading' : data }}</span>
        </div>
        <div>
          PollingInterval：{{ computedTime }}ms
        </div>
        <div class="space-x-2">
          <FaButton @click="start()">
            Start
          </FaButton>
          <FaButton @click="update()">
            time + 100ms
          </FaButton>
          <FaButton @click="cancel()">
            Stop
          </FaButton>
        </div>
      </div>
    </FaPageMain>
  </div>
</template>
