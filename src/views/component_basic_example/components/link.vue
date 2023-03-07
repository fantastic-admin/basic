<template>
  <div>
    <el-divider content-position="left">
      基础用法
    </el-divider>
    <el-link href="https://element.eleme.io" target="_blank">
      默认链接
    </el-link>
    <el-link type="primary">
      主要链接
    </el-link>
    <el-link type="success">
      成功链接
    </el-link>
    <el-link type="warning">
      警告链接
    </el-link>
    <el-link type="danger">
      危险链接
    </el-link>
    <el-link type="info">
      信息链接
    </el-link>
    <el-divider content-position="left">
      禁用状态
    </el-divider>
    <el-link disabled>
      默认链接
    </el-link>
    <el-link type="primary" disabled>
      主要链接
    </el-link>
    <el-link type="success" disabled>
      成功链接
    </el-link>
    <el-link type="warning" disabled>
      警告链接
    </el-link>
    <el-link type="danger" disabled>
      危险链接
    </el-link>
    <el-link type="info" disabled>
      信息链接
    </el-link>
    <el-divider content-position="left">
      下划线
    </el-divider>
    <el-link :underline="false">
      无下划线
    </el-link>
    <el-link>有下划线</el-link>
    <el-divider content-position="left">
      图标
    </el-divider>
    <el-link>
      <el-icon class="el-icon--left">
        <svg-icon name="i-ep:edit" />
      </el-icon>
      编辑
    </el-link>
    <el-link>
      查看
      <el-icon class="el-icon--right">
        <svg-icon name="i-ep:view" />
      </el-icon>
    </el-link>
  </div>
</template>

<style lang="scss" scoped>
.el-link {
  margin: 0 5px;
}
</style>
