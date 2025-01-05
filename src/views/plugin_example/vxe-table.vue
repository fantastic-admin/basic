<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import VxeUITable from 'vxe-table'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

const settingsStore = useSettingsStore()
watch(() => settingsStore.currentColorScheme, () => {
  VxeUITable.setTheme(settingsStore.currentColorScheme!)
}, {
  immediate: true,
})

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableData = ref<RowVO[]>([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
])

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="vxe-table">
      <template #description>
        <div class="space-y-2">
          <p>Element Plus 自带的 el-table 组件大部分时候只能满足简单需求的使用，如果对表格有更加复杂场景需求下的使用，推荐使用 vxe-table 。</p>
          <p>
            安装命令：
            <Command text="pnpm add xe-utils vxe-table" />
          </p>
        </div>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/x-extends/vxe-table')">
        <FaIcon name="i-ep:link" />
        访问 vxe-table
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <vxe-table :data="tableData">
        <vxe-column type="seq" width="60" />
        <vxe-column field="name" title="Name" />
        <vxe-column field="sex" title="Sex" />
        <vxe-column field="age" title="Age" />
      </vxe-table>
    </FaPageMain>
  </div>
</template>
