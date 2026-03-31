<script setup lang="ts">
import VxeUITable from 'vxe-table'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

const appSettingsStore = useAppSettingsStore()
watch(() => appSettingsStore.currentColorScheme, () => {
  VxeUITable.setTheme(appSettingsStore.currentColorScheme!)
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
    <FaPageHeader title="Vxe Table">
      <template #description>
        <Command text="pnpm add xe-utils vxe-table" />
      </template>
      <FaButton variant="outline" size="icon" @click="open('https://github.com/x-extends/vxe-table')">
        <FaIcon name="i-simple-icons:github" />
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <vxe-table :data="tableData">
        <vxe-column field="name" title="Name" />
        <vxe-column field="sex" title="Sex" />
        <vxe-column field="age" title="Age" />
      </vxe-table>
    </FaPageMain>
  </div>
</template>
