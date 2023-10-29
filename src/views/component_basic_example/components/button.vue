<template>
  <div>
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <ElRow>
      <ElButton>默认按钮</ElButton>
      <ElButton type="primary">
        主要按钮
      </ElButton>
      <ElButton type="success">
        成功按钮
      </ElButton>
      <ElButton type="info">
        信息按钮
      </ElButton>
      <ElButton type="warning">
        警告按钮
      </ElButton>
      <ElButton type="danger">
        危险按钮
      </ElButton>
    </ElRow>
    <ElRow>
      <ElButton plain>
        朴素按钮
      </ElButton>
      <ElButton type="primary" plain>
        主要按钮
      </ElButton>
      <ElButton type="success" plain>
        成功按钮
      </ElButton>
      <ElButton type="info" plain>
        信息按钮
      </ElButton>
      <ElButton type="warning" plain>
        警告按钮
      </ElButton>
      <ElButton type="danger" plain>
        危险按钮
      </ElButton>
    </ElRow>
    <ElRow>
      <ElButton round>
        圆角按钮
      </ElButton>
      <ElButton type="primary" round>
        主要按钮
      </ElButton>
      <ElButton type="success" round>
        成功按钮
      </ElButton>
      <ElButton type="info" round>
        信息按钮
      </ElButton>
      <ElButton type="warning" round>
        警告按钮
      </ElButton>
      <ElButton type="danger" round>
        危险按钮
      </ElButton>
    </ElRow>
    <ElRow>
      <ElButton circle>
        <template #icon>
          <SvgIcon name="ep:search" />
        </template>
      </ElButton>
      <ElButton type="primary" circle>
        <template #icon>
          <SvgIcon name="ep:edit" />
        </template>
      </ElButton>
      <ElButton type="success" circle>
        <template #icon>
          <SvgIcon name="ep:check" />
        </template>
      </ElButton>
      <ElButton type="info" circle>
        <template #icon>
          <SvgIcon name="ep:message" />
        </template>
      </ElButton>
      <ElButton type="warning" circle>
        <template #icon>
          <SvgIcon name="ep:star" />
        </template>
      </ElButton>
      <ElButton type="danger" circle>
        <template #icon>
          <SvgIcon name="ep:delete" />
        </template>
      </ElButton>
    </ElRow>
    <ElDivider content-position="left">
      禁用状态
    </ElDivider>
    <ElRow>
      <ElButton disabled>
        默认按钮
      </ElButton>
      <ElButton type="primary" disabled>
        主要按钮
      </ElButton>
      <ElButton type="success" disabled>
        成功按钮
      </ElButton>
      <ElButton type="info" disabled>
        信息按钮
      </ElButton>
      <ElButton type="warning" disabled>
        警告按钮
      </ElButton>
      <ElButton type="danger" disabled>
        危险按钮
      </ElButton>
    </ElRow>
    <ElRow>
      <ElButton plain disabled>
        朴素按钮
      </ElButton>
      <ElButton type="primary" plain disabled>
        主要按钮
      </ElButton>
      <ElButton type="success" plain disabled>
        成功按钮
      </ElButton>
      <ElButton type="info" plain disabled>
        信息按钮
      </ElButton>
      <ElButton type="warning" plain disabled>
        警告按钮
      </ElButton>
      <ElButton type="danger" plain disabled>
        危险按钮
      </ElButton>
    </ElRow>
    <ElDivider content-position="left">
      文字按钮
    </ElDivider>
    <ElButton text>
      文字按钮
    </ElButton>
    <ElButton type="primary" text>
      文字按钮
    </ElButton>
    <ElButton type="success" text>
      文字按钮
    </ElButton>
    <ElButton type="info" text>
      文字按钮
    </ElButton>
    <ElButton type="warning" text>
      文字按钮
    </ElButton>
    <ElButton type="danger" text>
      文字按钮
    </ElButton>
    <ElDivider content-position="left">
      图标按钮
    </ElDivider>
    <ElButton type="primary">
      <template #icon>
        <SvgIcon name="ep:edit" />
      </template>
    </ElButton>
    <ElButton type="primary">
      <template #icon>
        <SvgIcon name="ep:share" />
      </template>
    </ElButton>
    <ElButton type="primary">
      <template #icon>
        <SvgIcon name="ep:delete" />
      </template>
    </ElButton>
    <ElButton type="primary">
      <template #icon>
        <SvgIcon name="ep:search" />
      </template>
      搜索
    </ElButton>
    <ElButton type="primary">
      上传
      <SvgIcon name="ep:upload" class="el-icon--right" />
    </ElButton>
    <ElDivider content-position="left">
      按钮组
    </ElDivider>
    <ElButtonGroup style="margin-right: 10px;">
      <ElButton type="primary">
        <SvgIcon name="ep:arrow-left" class="el-icon--left" />
        上一页
      </ElButton>
      <ElButton type="primary">
        下一页
        <SvgIcon name="ep:arrow-right" class="el-icon--right" />
      </ElButton>
    </ElButtonGroup>
    <ElButtonGroup>
      <ElButton type="primary">
        <template #icon>
          <SvgIcon name="ep:edit" />
        </template>
      </ElButton>
      <ElButton type="primary">
        <template #icon>
          <SvgIcon name="ep:share" />
        </template>
      </ElButton>
      <ElButton type="primary">
        <template #icon>
          <SvgIcon name="ep:delete" />
        </template>
      </ElButton>
    </ElButtonGroup>
    <ElDivider content-position="left">
      加载中
    </ElDivider>
    <ElButton type="primary" :loading="true">
      加载中
    </ElButton>
    <ElDivider content-position="left">
      不同尺寸
    </ElDivider>
    <div style="margin-bottom: 10px;">
      <ElButton size="large">
        大号按钮
      </ElButton>
      <ElButton size="default">
        默认按钮
      </ElButton>
      <ElButton size="small">
        小号按钮
      </ElButton>
    </div>
    <div>
      <ElButton size="large" round>
        大号按钮
      </ElButton>
      <ElButton size="default" round>
        默认按钮
      </ElButton>
      <ElButton size="small" round>
        小号按钮
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
