<script lang="ts" setup name="PageMain">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  collaspe: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '',
  },
})

const titleSlot = !!useSlots().title

const collaspeData = ref(props.collaspe)
function unCollaspe() {
  collaspeData.value = false
}
</script>

<template>
  <div
    class="page-main" :class="{
      'is-collaspe': collaspeData,
    }" :style="{
      height: collaspeData ? height : '',
    }"
  >
    <div v-if="titleSlot || title" class="title-container">
      <slot v-if="titleSlot" name="title" />
      <template v-else>
        {{ title }}
      </template>
    </div>
    <slot />
    <div v-if="collaspeData" class="collaspe" title="展开" @click="unCollaspe">
      <el-icon>
        <svg-icon name="ep:arrow-down" />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-main {
  position: relative;
  margin: 20px;
  padding: 20px;
  background-color: var(--g-app-bg);
  transition: background-color 0.3s;

  &.is-collaspe {
    overflow: hidden;

    .collaspe {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 40px 0 10px;
      text-align: center;
      font-size: 24px;
      color: var(--el-text-color-primary);
      text-shadow: 0 0 1px var(--el-text-color-primary);
      background: linear-gradient(to bottom, transparent, var(--g-app-bg));
      transition: background 0.3s, var(--el-transition-color);
      cursor: pointer;

      &:hover {
        color: var(--el-text-color-secondary);
      }
    }
  }

  .title-container {
    width: calc(100% + 40px);
    padding: 14px 20px;
    margin-left: -20px;
    margin-top: -20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    transition: var(--el-transition-border);
  }
}
</style>
