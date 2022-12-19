<script lang="ts" setup name="ImagesUpload">
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  headers: {
    type: Object,
    default: () => {},
  },
  data: {
    type: Object,
    default: () => {},
  },
  name: {
    type: String,
    default: 'file',
  },
  url: {
    type: Array,
    default: () => [],
  },
  max: {
    type: Number,
    default: 3,
  },
  size: {
    type: Number,
    default: 2,
  },
  width: {
    type: Number,
    default: 150,
  },
  height: {
    type: Number,
    default: 150,
  },
  placeholder: {
    type: String,
    default: '',
  },
  notip: {
    type: Boolean,
    default: false,
  },
  ext: {
    type: Array,
    default: () => ['jpg', 'png', 'gif', 'bmp'],
  },
})

const emit = defineEmits(['update:url', 'onSuccess'])

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
  const url = props.url
  url.splice(index, 1)
  emit('update:url', url)
}
// 移动
function move(index: number, type: 'left' | 'right') {
  const url = props.url
  if (type === 'left' && index !== 0) {
    url[index] = url.splice(index - 1, 1, url[index])[0]
  }
  if (type === 'right' && index !== url.length - 1) {
    url[index] = url.splice(index + 1, 1, url[index])[0]
  }
  emit('update:url', url)
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const fileName = file.name.split('.')
  const fileExt = fileName.at(-1)
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
  emit('onSuccess', res)
}
</script>

<template>
  <div class="upload-container">
    <div v-for="(item, index) in (url as string[])" :key="index" class="images">
      <el-image v-if="index < max" :src="item" :style="`width:${width}px;height:${height}px;`" fit="cover" />
      <div class="mask">
        <div class="actions">
          <span title="预览" @click="preview(index)">
            <el-icon>
              <svg-icon name="ep:zoom-in" />
            </el-icon>
          </span>
          <span title="移除" @click="remove(index)">
            <el-icon>
              <svg-icon name="ep:delete" />
            </el-icon>
          </span>
          <span v-show="url.length > 1" title="左移" :class="{ disabled: index === 0 }" @click="move(index, 'left')">
            <el-icon>
              <svg-icon name="ep:back" />
            </el-icon>
          </span>
          <span v-show="url.length > 1" title="右移" :class="{ disabled: index === url.length - 1 }" @click="move(index, 'right')">
            <el-icon>
              <svg-icon name="ep:right" />
            </el-icon>
          </span>
        </div>
      </div>
    </div>
    <el-upload
      v-show="url.length < max"
      :show-file-list="false"
      :headers="headers"
      :action="action"
      :data="data"
      :name="name"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :on-success="onSuccess"
      drag
      class="images-upload"
    >
      <div class="image-slot" :style="`width:${width}px;height:${height}px;`">
        <el-icon>
          <svg-icon name="ep:plus" />
        </el-icon>
      </div>
      <div v-show="uploadData.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
        <el-image :src="uploadData.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
        <el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="uploadData.progress.percent" />
      </div>
    </el-upload>
    <div v-if="!notip" class="el-upload__tip">
      <div style="display: inline-block;">
        <el-alert :title="`上传图片支持 ${ext.join(' / ')} 格式，单张图片大小不超过 ${size}MB，建议图片尺寸为 ${width}*${height}，且图片数量不超过 ${max} 张`" type="info" show-icon :closable="false" />
      </div>
    </div>
    <el-image-viewer v-if="uploadData.imageViewerVisible" :url-list="url as string[]" :initial-index="uploadData.dialogImageIndex" teleported @close="previewClose" />
  </div>
</template>

<style lang="scss" scoped>
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
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  overflow: hidden;

  .mask {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--el-overlay-color-lighter);
    transition: opacity 0.3s;

    .actions {
      width: 100px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      @include position-center(xy);

      span {
        width: 50%;
        text-align: center;
        cursor: pointer;
        color: var(--el-color-white);
        transition: color 0.1s, transform 0.1s;

        &.disabled {
          color: var(--el-text-color-disabled);
          cursor: not-allowed;
        }

        &:hover:not(.disabled) {
          transform: scale(1.5);
        }

        .el-icon {
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
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: var(--el-text-color-placeholder);
      background-color: transparent;

      i {
        font-size: 30px;
      }
    }

    .progress {
      position: absolute;
      top: 0;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: var(--el-overlay-color-lighter);
      }

      .el-progress {
        z-index: 1;

        @include position-center(xy);

        .el-progress__text {
          color: var(--el-text-color-placeholder);
        }
      }
    }
  }
}
</style>
