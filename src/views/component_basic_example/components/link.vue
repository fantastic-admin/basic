<template>
  <div>
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <ElLink href="https://element.eleme.io" target="_blank">
      默认链接
    </ElLink>
    <ElLink type="primary">
      主要链接
    </ElLink>
    <ElLink type="success">
      成功链接
    </ElLink>
    <ElLink type="warning">
      警告链接
    </ElLink>
    <ElLink type="danger">
      危险链接
    </ElLink>
    <ElLink type="info">
      信息链接
    </ElLink>
    <ElDivider content-position="left">
      禁用状态
    </ElDivider>
    <ElLink disabled>
      默认链接
    </ElLink>
    <ElLink type="primary" disabled>
      主要链接
    </ElLink>
    <ElLink type="success" disabled>
      成功链接
    </ElLink>
    <ElLink type="warning" disabled>
      警告链接
    </ElLink>
    <ElLink type="danger" disabled>
      危险链接
    </ElLink>
    <ElLink type="info" disabled>
      信息链接
    </ElLink>
    <ElDivider content-position="left">
      下划线
    </ElDivider>
    <ElLink :underline="false">
      无下划线
    </ElLink>
    <ElLink>有下划线</ElLink>
    <ElDivider content-position="left">
      图标
    </ElDivider>
    <ElLink>
      <SvgIcon name="ep:edit" class="el-icon--left" />
      编辑
    </ElLink>
    <ElLink>
      查看
      <SvgIcon name="ep:view" class="el-icon--right" />
    </ElLink>
  </div>
</template>

<style lang="scss" scoped>
.el-link {
  margin: 0 5px;
}
</style>
