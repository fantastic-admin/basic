<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <PageHeader title="页头" content="PageHeader" />
    <PageHeader title="页面标题">
      <template #content>
        <p>提供两块插槽：</p>
        <p>一块是 content 区域插槽，一块是右侧区域</p>
      </template>
      <ElButton round>
        <template #icon>
          <SvgIcon name="ep:arrow-left" />
        </template>
        返回
      </ElButton>
    </PageHeader>
  </div>
</template>
