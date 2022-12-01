<script lang="ts" setup name="LinkView">
const route = useRoute()

function open() {
  window.open(route.meta.link, '_blank')
}
</script>

<template>
  <div class="link-view">
    <transition name="link" mode="out-in" appear>
      <page-main :key="route.meta.link" title="⚠️访问提醒">
        <div class="container">
          <div class="title">
            是否访问此链接
          </div>
          <div class="link">
            {{ route.meta.link }}
          </div>
          <el-button type="primary" plain round @click="open">
            <template #icon>
              <el-icon>
                <svg-icon name="ep:link" />
              </el-icon>
            </template>
            立即访问
          </el-button>
        </div>
      </page-main>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.link-view {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .page-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0 50px;

      .title {
        margin: 10px 0;
        font-size: 22px;
        color: var(--el-text-color-primary);
      }

      .link {
        margin: 10px 0;
        max-width: 300px;
        font-size: 14px;
        color: var(--el-text-color-disabled);

        @include text-overflow(3);
      }

      .el-button {
        margin: 20px 0;
      }
    }
  }
}
// link 区动画
.link-enter-active {
  transition: 0.2s;
}

.link-leave-active {
  transition: 0.15s;
}

.link-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.link-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
