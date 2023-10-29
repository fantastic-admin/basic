<template>
  <div class="alert">
    <ElAlert show-icon type="info" title="「插件」栏目下均为第三方插件的演示页面，框架默认并不包含这些插件。如需使用，请先安装对应插件。" :closable="false" />
  </div>
</template>

<style lang="scss" scoped>
.alert {
  padding: 20px 20px 0;
  background-color: var(--g-container-bg);
  transition: background-color 0.3s;
}
</style>
