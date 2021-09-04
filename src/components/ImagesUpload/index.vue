<template>
    <div class="upload-container">
        <div v-for="(item, index) in url" :key="index" class="images">
            <el-image v-if="index < max" :src="item" :style="`width:${width}px;height:${height}px;`" fit="cover" />
            <div class="mask">
                <div class="actions">
                    <span title="预览" @click="preview(index)">
                        <i class="el-icon-zoom-in" />
                    </span>
                    <span title="移除" @click="remove(index)">
                        <i class="el-icon-delete" />
                    </span>
                    <span v-show="url.length > 1" title="左移" :class="{'disabled': index == 0}" @click="move(index, 'left')">
                        <i class="el-icon-back" />
                    </span>
                    <span v-show="url.length > 1" title="右移" :class="{'disabled': index == url.length - 1}" @click="move(index, 'right')">
                        <i class="el-icon-right" />
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
                <i class="el-icon-plus" />
            </div>
            <div v-show="data.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
                <el-image :src="data.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
                <el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="data.progress.percent" />
            </div>
        </el-upload>
        <div v-if="!notip" class="el-upload__tip">
            <div style="display: inline-block;">
                <el-alert :title="`上传图片支持 ${ ext.join(' / ') } 格式，单张图片大小不超过 ${ size }MB，建议图片尺寸为 ${width}*${height}，且图片数量不超过 ${ max } 张`" type="info" show-icon :closable="false" />
            </div>
        </div>
        <el-image-viewer v-if="data.imageViewerVisible" :url-list="url" :initial-index="data.dialogImageIndex" @close="previewClose" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
    action: {
        type: String,
        required: true
    },
    headers: {
        type: Object,
        default: () => {}
    },
    data: {
        type: Object,
        default: () => {}
    },
    name: {
        type: String,
        default: 'file'
    },
    url: {
        type: Array,
        default: () => []
    },
    max: {
        type: Number,
        default: 3
    },
    size: {
        type: Number,
        default: 2
    },
    width: {
        type: Number,
        default: 150
    },
    height: {
        type: Number,
        default: 150
    },
    placeholder: {
        type: String,
        default: ''
    },
    notip: {
        type: Boolean,
        default: false
    },
    ext: {
        type: Array,
        default: () => ['jpg', 'png', 'gif', 'bmp']
    }
})

const emit = defineEmits(['update:url', 'on-success'])

const data = ref({
    dialogImageIndex: 0,
    imageViewerVisible: false,
    progress: {
        preview: '',
        percent: 0
    }
})

// 预览
function preview(index) {
    data.value.dialogImageIndex = index
    data.value.imageViewerVisible = true
}
// 关闭预览
function previewClose() {
    data.value.imageViewerVisible = false
}
// 移除
function remove(index) {
    let url = props.url
    url.splice(index, 1)
    emit('update:url', url)
}
// 移动
function move(index, type) {
    let url = props.url
    if (type == 'left' && index != 0) {
        url[index] = url.splice(index - 1, 1, url[index])[0]
    }
    if (type == 'right' && index != url.length - 1) {
        url[index] = url.splice(index + 1, 1, url[index])[0]
    }
    emit('update:url', url)
}
function beforeUpload(file) {
    const fileName = file.name.split('.')
    const fileExt = fileName[fileName.length - 1]
    const isTypeOk = props.ext.indexOf(fileExt) >= 0
    const isSizeOk = file.size / 1024 / 1024 < props.size
    if (!isTypeOk) {
        proxy.$message.error(`上传图片只支持 ${ props.ext.join(' / ') } 格式！`)
    }
    if (!isSizeOk) {
        proxy.$message.error(`上传图片大小不能超过 ${props.size}MB！`)
    }
    if (isTypeOk && isSizeOk) {
        data.value.progress.preview = URL.createObjectURL(file)
    }
    return isTypeOk && isSizeOk
}
function onProgress(file) {
    data.value.progress.percent = ~~file.percent
    if (data.value.progress.percent == 100) {
        data.value.progress.preview = ''
        data.value.progress.percent = 0
    }
}
function onSuccess(res) {
    emit('on-success', res)
}
</script>

<style lang="scss" scoped>
.upload-container {
    line-height: initial;
}
.images {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    .el-image {
        display: block;
    }
    .mask {
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 24px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
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
                color: #fff;
                cursor: pointer;
                transition: all 0.1s;
                &.disabled {
                    color: #999;
                    cursor: not-allowed;
                }
                &:hover:not(.disabled) {
                    transform: scale(1.5);
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
}
:deep(.el-upload) {
    .el-upload-dragger {
        width: auto;
        height: auto;
        &.is-dragover {
            border-width: 1px;
        }
        .image-slot {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: #909399;
            font-size: 30px;
            background-color: transparent;
        }
        .progress {
            position: absolute;
            top: 0;
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(0, 0, 0, 0.2);
            }
            .el-progress {
                z-index: 1;
                @include position-center(xy);
                .el-progress__text {
                    color: #fff;
                }
            }
        }
    }
}
</style>
