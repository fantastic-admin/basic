<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()

const tabbar = useTabbar()

function open() {
  tabbar.open(settingsStore.settings.home.fullPath)
}
function close() {
  tabbar.close(settingsStore.settings.home.fullPath)
}
function closeById() {
  tabbar.closeById()
}
function closeById2() {
  tabbar.closeById(settingsStore.settings.home.fullPath)
}
function closeOtherSide() {
  tabbar.closeOtherSide()
}
function closeLeftSide() {
  tabbar.closeLeftSide()
}
function closeRightSide() {
  tabbar.closeRightSide()
}
</script>

<template>
  <div>
    <PageHeader title="标签栏" content="功能类似于浏览器的标签栏，支持右键操作" />
    <PageMain title="打开新标签页">
      <p>如果目标地址已在标签栏存在，则直接切换并访问。如果目标地址在标签栏不存在，则会在当前标签页后面插入新的标签页。</p>
      <ElButton @click="open">
        打开主页
      </ElButton>
    </PageMain>
    <PageMain title="关闭当前标签页并跳转">
      <p>关闭当前标签页，同时跳转到新页面。</p>
      <ElButton @click="close">
        关闭当前标签页，并跳转到主页
      </ElButton>
    </PageMain>
    <PageMain title="关闭指定标签页">
      <p>如果当前只有一个标签时，则无法关闭。</p>
      <p>如果关闭的是当前标签页，则会在关闭后跳转至紧邻的标签页。</p>
      <p>如果关闭的目标页面不存在，则无法关闭。</p>
      <ElButton @click="closeById">
        关闭当前页面
      </ElButton>
      <ElButton @click="closeById2">
        关闭主页
      </ElButton>
    </PageMain>
    <PageMain title="关闭非当前标签页">
      <p>除了提供关闭非当前标签页的 API 外，还提供了校验 API 。</p>
      <ElButton :disabled="!tabbar.checkCloseOtherSide()" @click="closeOtherSide">
        关闭两侧标签页
      </ElButton>
      <ElButton :disabled="!tabbar.checkCloseLeftSide()" @click="closeLeftSide">
        关闭左侧标签页
      </ElButton>
      <ElButton :disabled="!tabbar.checkCloseRightSide()" @click="closeRightSide">
        关闭右侧标签页
      </ElButton>
    </PageMain>
  </div>
</template>
