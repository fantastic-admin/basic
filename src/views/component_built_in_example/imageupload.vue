<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const files1 = ref<string[]>([])
const files2 = ref<string[]>(['https://fantastic-admin.hurui.me/logo.svg'])
const files3 = ref<string[]>([])

function handleSuccess() {
  toast.success('模拟上传成功')
}
</script>

<template>
  <div>
    <FaPageHeader title="图片上传" description="FaImageUpload" />
    <FaPageMain>
      <FaImageUpload
        v-model="files1"
        action="/mock/upload"
        :after-upload="(response) => response.data.url"
        @on-success="handleSuccess"
      />
    </FaPageMain>
    <FaPageMain title="多图上传">
      <FaImageUpload
        v-model="files2"
        action="/mock/upload"
        :after-upload="(response) => response.data.url"
        :max="2"
        @on-success="handleSuccess"
      />
    </FaPageMain>
    <FaPageMain title="自定义默认内容、容器大小、建议尺寸、限制类型、不限制数量">
      <FaImageUpload
        v-model="files3"
        action="/mock/upload"
        :after-upload="(response) => response.data.url"
        :width="200"
        :height="130"
        :dimension="{ width: 400, height: 260 }"
        :ext="['png']"
        :size="200 * 1024"
        :max="0"
        @on-success="handleSuccess"
      >
        <FaIcon name="i-noto:identification-card" class="size-50 opacity-50" />
      </FaImageUpload>
    </FaPageMain>
  </div>
</template>
