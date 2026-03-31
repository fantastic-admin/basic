<script setup lang="ts">
const drawer = ref(false)

const drawerInfo = ref({
  side: 'right' as const,
  closable: true,
  header: true,
  footer: true,
  loading: false,
  class: '',
})
watch(() => drawerInfo.value.loading, (loading) => {
  if (loading) {
    setTimeout(() => {
      drawerInfo.value.loading = false
    }, 3000)
  }
})

function handleBeforeClose(action: 'confirm' | 'cancel' | 'close', done: () => void) {
  if (action === 'close') {
    useFaModal().confirm({
      title: '提示',
      content: '确定要关闭吗？',
      onConfirm: () => {
        done()
      },
    })
  }
  else {
    done()
  }
}
</script>

<template>
  <FaButton @click="drawer = true">
    打开
  </FaButton>
  <FaDrawer v-model="drawer" title="标题" description="这里是一段描述介绍" :side="drawerInfo.side" :closable="drawerInfo.closable" :loading="drawerInfo.loading" :header="drawerInfo.header" :footer="drawerInfo.footer" :before-close="handleBeforeClose" :content-class="drawerInfo.class">
    <div class="flex-start-center flex-wrap gap-2">
      <FaSelect
        v-model="drawerInfo.side" :options="[
          { label: '左侧', value: 'left' },
          { label: '右侧', value: 'right' },
          { label: '顶部', value: 'top' },
          { label: '底部', value: 'bottom' },
        ]" class="w-full"
      />
      <FaButton :variant="drawerInfo.closable ? 'default' : 'outline'" class="w-full" @click="drawerInfo.closable = !drawerInfo.closable">
        关闭按钮
      </FaButton>
      <FaButton :variant="drawerInfo.header ? 'default' : 'outline'" class="w-full" @click="drawerInfo.header = !drawerInfo.header">
        头部区域
      </FaButton>
      <FaButton :variant="drawerInfo.footer ? 'default' : 'outline'" class="w-full" @click="drawerInfo.footer = !drawerInfo.footer">
        尾部区域
      </FaButton>
      <FaButton variant="outline" class="w-full" @click="drawerInfo.loading = true">
        显示加载中
      </FaButton>
      <FaButton :variant="!!drawerInfo.class ? 'default' : 'outline'" class="w-full" @click="drawerInfo.class = !!drawerInfo.class ? '' : 'sm:max-w-lg'">
        调整最大宽度
      </FaButton>
    </div>
  </FaDrawer>
</template>
