<script setup lang="ts">
defineOptions({
  name: 'PageHeader',
})

withDefaults(
  defineProps<{
    title: string
    content?: string
  }>(),
  {
    content: '',
  },
)

const slots = useSlots()
</script>

<template>
  <div class="page-header">
    <div class="main">
      <div class="title">
        {{ title }}
      </div>
      <div class="content">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </div>
    <div v-if="slots.default" class="sub">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  padding: 16px 20px;
  background-color: var(--g-app-bg);
  transition: background-color 0.3s;

  .main {
    flex: 1 1 70%;

    .title {
      font-size: 22px;
      color: var(--el-text-color-primary);
      transition: var(--el-transition-color);
    }

    .content {
      margin-top: 10px;
      font-size: 14px;
      color: var(--el-text-color-secondary);
      transition: var(--el-transition-color);

      &:empty {
        display: none;
      }
    }
  }

  .sub {
    flex: none;
    margin-left: auto;
  }
}
</style>
