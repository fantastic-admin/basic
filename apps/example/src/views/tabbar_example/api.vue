<script setup lang="ts">
const appSettingsStore = useAppSettingsStore()
const router = useRouter()
const tabbar = useAppTabbar()

function open() {
  router.push(appSettingsStore.settings.app.home.fullPath)
}
function close() {
  router.close(appSettingsStore.settings.app.home.fullPath)
}
function closeById() {
  tabbar.closeById()
}
function closeById2() {
  tabbar.closeById(appSettingsStore.settings.app.home.fullPath)
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
    <FaPageHeader title="标签栏" description="类似于浏览器的标签栏，并且支持右键操作" />
    <FaPageMain title="打开新标签页" main-class="space-y-2">
      <p>如果目标地址已在标签栏存在，则直接切换并访问。如果目标地址在标签栏不存在，则会在当前标签页后面插入新的标签页。</p>
      <FaButton @click="open">
        打开主页
      </FaButton>
    </FaPageMain>
    <FaPageMain title="关闭当前标签页并跳转" main-class="space-y-2">
      <FaButton @click="close">
        关闭当前标签页，并跳转到主页
      </FaButton>
    </FaPageMain>
    <FaPageMain title="关闭指定标签页" main-class="space-y-2">
      <p>如果当前只有一个标签时，则无法关闭。</p>
      <p>如果关闭的是当前标签页，则会在关闭后跳转至紧邻的标签页。</p>
      <p>如果关闭的目标页面不存在，则无法关闭。</p>
      <div class="space-x-2">
        <FaButton @click="closeById">
          关闭当前页面
        </FaButton>
        <FaButton @click="closeById2">
          关闭主页
        </FaButton>
      </div>
    </FaPageMain>
    <FaPageMain title="关闭非当前标签页" main-class="space-y-2">
      <p>除了提供关闭非当前标签页的 API 外，还提供了校验 API 。</p>
      <div class="space-x-2">
        <FaButton :disabled="!tabbar.checkCloseOtherSide()" @click="closeOtherSide">
          关闭两侧标签页
        </FaButton>
        <FaButton :disabled="!tabbar.checkCloseLeftSide()" @click="closeLeftSide">
          关闭左侧标签页
        </FaButton>
        <FaButton :disabled="!tabbar.checkCloseRightSide()" @click="closeRightSide">
          关闭右侧标签页
        </FaButton>
      </div>
    </FaPageMain>
  </div>
</template>
