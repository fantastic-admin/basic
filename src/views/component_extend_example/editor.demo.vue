<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup name="ComponentExampleEditor">
const content = ref('<h1>Fantastic-admin</h1>')
</script>

<template>
  <div>
    <page-header title="富文本编辑器">
      <template #content>
        <p>Editor</p>
        <p style="margin-bottom: 0;">
          基于 TinyMCE 并做了简单封装
        </p>
      </template>
    </page-header>
    <page-main title="富文本编辑器">
      <editor v-model="content" />
      <div class="preview" v-html="content" />
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  margin-top: 10px;

  &::before {
    content: "预览：";
    display: block;
  }
}
</style>
