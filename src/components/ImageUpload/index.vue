<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'ImageUpload',
})

const props = withDefaults(
  defineProps<{
    action: UploadProps['action']
    headers?: UploadProps['headers']
    data?: UploadProps['data']
    name?: UploadProps['name']
    size?: number
    width?: number
    height?: number
    placeholder?: string
    notip?: boolean
    ext?: string[]
    httpRequest?: UploadProps['httpRequest']
  }>(),
  {
    name: 'file',
    size: 2,
    width: 150,
    height: 150,
    placeholder: '',
    notip: false,
    ext: () => ['jpg', 'png', 'gif', 'bmp'],
  },
)

const emits = defineEmits<{
  onSuccess: [
    res: any,
  ]
}>()

const url = defineModel<string>({
  default: '',
})

const uploadData = ref({
  imageViewerVisible: false,
  progress: {
    preview: '',
    percent: 0,
  },
})

// 预览
function preview() {
  uploadData.value.imageViewerVisible = true
}
// 关闭预览
function previewClose() {
  uploadData.value.imageViewerVisible = false
}
// 移除
function remove() {
  url.value = ''
}
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const fileName = file.name.split('.')
  const fileExt = fileName.at(-1) ?? ''
  const isTypeOk = props.ext.includes(fileExt)
  const isSizeOk = file.size / 1024 / 1024 < props.size
  if (!isTypeOk) {
    ElMessage.error(`上传图片只支持 ${props.ext.join(' / ')} 格式！`)
  }
  if (!isSizeOk) {
    ElMessage.error(`上传图片大小不能超过 ${props.size}MB！`)
  }
  if (isTypeOk && isSizeOk) {
    uploadData.value.progress.preview = URL.createObjectURL(file)
  }
  return isTypeOk && isSizeOk
}
const onProgress: UploadProps['onProgress'] = (file) => {
  uploadData.value.progress.percent = ~~file.percent
}
const onSuccess: UploadProps['onSuccess'] = (res) => {
  uploadData.value.progress.preview = ''
  uploadData.value.progress.percent = 0
  emits('onSuccess', res)
}
</script>

<template>
  <div class="upload-container">
    <ElUpload
      :show-file-list="false"
      :headers="headers"
      :action="action"
      :data="data"
      :name="name"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :http-request="httpRequest"
      drag
      class="image-upload"
    >
      <ElImage v-if="url === ''" :src="url === '' ? placeholder : url" :style="`width:${width}px;height:${height}px;`" fit="fill">
        <template #error>
          <div class="image-slot" :style="`width:${width}px;height:${height}px;`">
            <SvgIcon name="i-ep:plus" class="icon" />
          </div>
        </template>
      </ElImage>
      <div v-else class="image">
        <ElImage :src="url" :style="`width:${width}px;height:${height}px;`" fit="fill" />
        <div class="mask">
          <div class="actions">
            <span title="预览" @click.stop="preview">
              <SvgIcon name="i-ep:zoom-in" class="icon" />
            </span>
            <span title="移除" @click.stop="remove">
              <SvgIcon name="i-ep:delete" class="icon" />
            </span>
          </div>
        </div>
      </div>
      <div v-show="url === '' && uploadData.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
        <ElImage :src="uploadData.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
        <ElProgress type="circle" :width="Math.min(width, height) * 0.8" :percentage="uploadData.progress.percent" />
      </div>
    </ElUpload>
    <div v-if="!notip" class="el-upload__tip">
      <div style="display: inline-block;">
        <ElAlert :title="`上传图片支持 ${ext.join(' / ')} 格式，且图片大小不超过 ${size}MB，建议图片尺寸为 ${width}*${height}`" type="info" show-icon :closable="false" />
      </div>
    </div>
    <ElImageViewer v-if="uploadData.imageViewerVisible" :url-list="[url]" teleported @close="previewClose" />
  </div>
</template>

<style scoped>
.upload-container {
  line-height: initial;
}

.el-image {
  display: block;
}

.image {
  position: relative;
  overflow: hidden;
  border-radius: 6px;

  .mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--el-overlay-color-lighter);
    opacity: 0;
    transition: opacity 0.3s;

    .actions {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      transform: translateX(-50%) translateY(-50%);

      span {
        width: 50%;
        color: var(--el-color-white);
        text-align: center;
        cursor: pointer;
        transition: color 0.1s, transform 0.1s;

        &:hover {
          transform: scale(1.5);
        }

        .icon {
          font-size: 24px;
        }
      }
    }
  }

  &:hover .mask {
    opacity: 1;
  }
}

.image-upload {
  display: inline-block;
  vertical-align: top;
}

:deep(.el-upload) {
  .el-upload-dragger {
    display: inline-block;
    padding: 0;

    &.is-dragover {
      border-width: 1px;
    }

    .image-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--el-text-color-placeholder);
      background-color: transparent;

      .icon {
        font-size: 30px;
      }
    }

    .progress {
      position: absolute;
      top: 0;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        background-color: var(--el-overlay-color-lighter);
      }

      .el-progress {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translateX(-50%) translateY(-50%);

        .el-progress__text {
          color: var(--el-text-color-placeholder);
        }
      }
    }
  }
}
</style>
