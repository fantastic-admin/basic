<script setup lang="ts">
const checkList = ref(1)
const dialog = ref(false)
const input = ref('')
const select = ref(1)
const slideover = ref(false)
const tabList = ref(1)
const toggle = ref(false)
</script>

<template>
  <div>
    <PageHeader title="内建组件" content="内建组件仅服务于框架自身，不建议在业务页面内使用，业务页面内请使用专业的 UI 组件库。" />
    <div class="flex flex-col flex-wrap gap-4 px-4 lg:flex-row">
      <PageMain title="Button">
        <HButton>
          按钮
        </HButton>
        <HButton outline>
          按钮
        </HButton>
        <HButton disabled>
          按钮
        </HButton>
        <HButton disabled outline>
          按钮
        </HButton>
      </PageMain>
      <PageMain title="CheckList">
        <HCheckList
          v-model="checkList" :options="[
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2, disabled: true },
            { label: '选项3', value: 3 },
          ]"
        />
      </PageMain>
      <PageMain title="Dialog">
        <HButton @click="dialog = true">
          打开
        </HButton>
        <HDialog v-model="dialog" title="标题">
          这里是 dialog 内容
        </HDialog>
      </PageMain>
      <PageMain title="Dropdown">
        <HDropdown>
          <div>
            下拉面板
            <SvgIcon name="ep:caret-bottom" />
          </div>
          <template #dropdown>
            <div class="h-30 w-60 flex items-center justify-center">
              下拉内容
            </div>
          </template>
        </HDropdown>
      </PageMain>
      <PageMain title="DropdownMenu">
        <HDropdownMenu
          :items="[
            [
              { label: '菜单1-1' },
              { label: '菜单1-2' },
              { label: '菜单1-3' },
            ],
            [
              { label: '菜单2' },
            ],
          ]"
        >
          <div>
            下拉菜单
            <SvgIcon name="ep:caret-bottom" />
          </div>
        </HDropdownMenu>
      </PageMain>
      <PageMain title="Input">
        <HInput v-model="input" />
      </PageMain>
      <PageMain title="Kbd">
        <HKbd>Ctrl</HKbd>
        <HKbd>⌘ K</HKbd>
      </PageMain>
      <PageMain title="Select">
        <HSelect
          v-model="select" :options="[
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2, disabled: true },
            { label: '选项3', value: 3 },
          ]"
        />
      </PageMain>
      <PageMain title="Slideover">
        <HButton @click="slideover = true">
          打开
        </HButton>
        <HSlideover v-model="slideover" title="标题" :overlay="false">
          这里是 slideover 内容
        </HSlideover>
      </PageMain>
      <PageMain title="TabList">
        <HTabList
          v-model="tabList"
          :options="[
            { label: '标签1', value: 1 },
            { label: '标签2', value: 2 },
            { label: '标签3', value: 3 },
          ]"
        />
      </PageMain>
      <PageMain title="Toggle">
        <HToggle v-model="toggle" />
        <HToggle v-model="toggle" on-icon="ri:sun-line" off-icon="ri:moon-line" />
      </PageMain>
      <PageMain title="Tooltip">
        <HTooltip text="注意噢！">
          <SvgIcon name="ri:question-line" />
        </HTooltip>
      </PageMain>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-main {
  --at-apply: flex-grow-1 flex-shrink-1 flex-basis-400px m-0 min-h-50;

  :deep(.main-container) {
    --at-apply: flex items-center justify-center flex-1 gap-4;
  }
}
</style>
