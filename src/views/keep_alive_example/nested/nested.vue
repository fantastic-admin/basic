<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import useKeepAliveStore from '@/store/modules/keepAlive'

defineOptions({
  name: 'TabExampleNested1',
})

const keepAliveStore = useKeepAliveStore()
</script>

<template>
  <div>
    <FaPageMain>
      <div>层级：1</div>
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="keepAliveStore.list">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </FaPageMain>
  </div>
</template>
