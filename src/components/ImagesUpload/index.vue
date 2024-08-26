<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'ImagesUpload',
})

const props = withDefaults(
  defineProps<{
    action: UploadProps['action']
    headers?: UploadProps['headers']
    data?: UploadProps['data']
    name?: UploadProps['name']
    size?: number
    max?: number
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
    max: 3,
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

const url = defineModel<string[]>({
  default: [],
})

const uploadData = ref({
  dialogImageIndex: 0,
  imageViewerVisible: false,
  progress: {
    preview: '',
    percent: 0,
  },
})

// 预览
function preview(index: number) {
  uploadData.value.dialogImageIndex = index
  uploadData.value.imageViewerVisible = true
}
// 关闭预览
function previewClose() {
  uploadData.value.imageViewerVisible = false
}
// 移除
function remove(index: number) {
  url.value.splice(index, 1)
}
// 移动
function move(index: number, type: 'left' | 'right') {
  if (type === 'left' && index !== 0) {
    url.value[index] = url.value.splice(index - 1, 1, url.value[index])[0]
  }
  if (type === 'right' && index !== url.value.length - 1) {
    url.value[index] = url.value.splice(index + 1, 1, url.value[index])[0]
  }
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
    <div v-for="(item, index) in (url as string[])" :key="index" class="images">
      <ElImage v-if="index < max" :src="item" :style="`width:${width}px;height:${height}px;`" fit="cover" />
      <div class="mask">
        <div class="actions">
          <span title="预览" @click="preview(index)">
            <SvgIcon name="i-ep:zoom-in" class="icon" />
          </span>
          <span title="移除" @click="remove(index)">
            <SvgIcon name="i-ep:delete" class="icon" />
          </span>
          <span v-show="url.length > 1" title="左移" :class="{ disabled: index === 0 }" @click="move(index, 'left')">
            <SvgIcon name="i-ep:back" class="icon" />
          </span>
          <span v-show="url.length > 1" title="右移" :class="{ disabled: index === url.length - 1 }" @click="move(index, 'right')">
            <SvgIcon name="i-ep:right" class="icon" />
          </span>
        </div>
      </div>
    </div>
    <ElUpload
      v-show="url.length < max"
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
      class="images-upload"
    >
      <div class="image-slot" :style="`width:${width}px;height:${height}px;`">
        <SvgIcon name="i-ep:plus" class="icon" />
      </div>
      <div v-show="uploadData.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
        <ElImage :src="uploadData.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
        <ElProgress type="circle" :width="Math.min(width, height) * 0.8" :percentage="uploadData.progress.percent" />
      </div>
    </ElUpload>
    <div v-if="!notip" class="el-upload__tip">
      <div style="display: inline-block;">
        <ElAlert :title="`上传图片支持 ${ext.join(' / ')} 格式，单张图片大小不超过 ${size}MB，建议图片尺寸为 ${width}*${height}，且图片数量不超过 ${max} 张`" type="info" show-icon :closable="false" />
      </div>
    </div>
    <ElImageViewer v-if="uploadData.imageViewerVisible" :url-list="url as string[]" :initial-index="uploadData.dialogImageIndex" teleported @close="previewClose" />
  </div>
</template>

<style scoped>
.upload-container {
  line-height: initial;
}

.el-image {
  display: block;
}

.images {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  overflow: hidden;
  border: 1px dashed var(--el-border-color);
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

        &.disabled {
          color: var(--el-text-color-disabled);
          cursor: not-allowed;
        }

        &:hover:not(.disabled) {
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

.images-upload {
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
