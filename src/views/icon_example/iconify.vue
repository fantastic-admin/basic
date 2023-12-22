<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { icons } from '@/iconify'

const { text, copy, copied } = useClipboard()

const dialog = ref({
  visible: false,
  iconName: '',
})

const code = computed(() => {
  return `<svg-icon name="${dialog.value.iconName}"></svg-icon>`
})

watch(copied, (val) => {
  val && ElMessage.success(`复制成功：${text.value}`)
})

function showInfo(iconName: string) {
  dialog.value.iconName = iconName
  dialog.value.visible = true
}
</script>

<template>
  <div>
    <PageHeader title="Iconify">
      <template #content>
        本框架支持使用 Iconify 的所有图标集，以下展示部分图标集。
      </template>
    </PageHeader>
    <PageMain v-for="(icon, key) in icons" :key="key" :title="icon.info.name">
      <ElRow :gutter="20">
        <ElCol v-for="(item, index) in icon.info.samples" :key="index" :xs="6" :sm="8" :md="3" :lg="2">
          <ElCard shadow="hover" @click="showInfo(`${icon.prefix}:${item}`)">
            <SvgIcon :name="`${icon.prefix}:${item}`" />
          </ElCard>
        </ElCol>
      </ElRow>
    </PageMain>
    <ElDialog v-model="dialog.visible" :show-close="false" width="600px">
      <ElRow type="flex">
        <ElCol style="max-width: 100px;">
          <div class="icon-box">
            <SvgIcon :name="dialog.iconName" />
          </div>
        </ElCol>
        <ElCol style="flex: 1;">
          <div class="icon-info">
            <div class="title">
              {{ dialog.iconName }}
            </div>
            <ElInput v-model="code" readonly>
              <template #append>
                <ElButton type="primary" @click="copy(code)">
                  复制
                </ElButton>
              </template>
            </ElInput>
          </div>
        </ElCol>
      </ElRow>
      <div class="more-info">
        <ElDivider content-position="left">
          结合 Element Plus 使用场景
        </ElDivider>
        <ElButton>
          <template #icon>
            <SvgIcon :name="dialog.iconName" />
          </template>
          Icon 按钮
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 15px;

  :deep(.el-card__body) {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  i {
    font-size: 24px;
  }
}

:deep(.el-dialog) {
  .el-dialog__body {
    padding: 0 30px 30px;
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border: 1px solid #e0e8ef;

    i {
      font-size: 60px;
    }
  }

  .icon-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
