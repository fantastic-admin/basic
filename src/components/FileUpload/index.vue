<script setup name="FileUpload">
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
    size: {
        type: Number,
        default: 2
    },
    max: {
        type: Number,
        default: 3
    },
    files: {
        type: Array,
        default: () => []
    },
    notip: {
        type: Boolean,
        default: false
    },
    ext: {
        type: Array,
        default: () => ['zip', 'rar']
    }
})

const emit = defineEmits(['on-success'])

function beforeUpload(file) {
    const fileName = file.name.split('.')
    const fileExt = fileName[fileName.length - 1]
    const isTypeOk = props.ext.indexOf(fileExt) >= 0
    const isSizeOk = file.size / 1024 / 1024 < props.size
    if (!isTypeOk) {
        proxy.$message.error(`上传文件只支持 ${ props.ext.join(' / ') } 格式！`)
    }
    if (!isSizeOk) {
        proxy.$message.error(`上传文件大小不能超过 ${props.size}MB！`)
    }
    return isTypeOk && isSizeOk
}
function onExceed() {
    proxy.$message.warning('文件上传超过限制')
}
function onSuccess(res, file) {
    emit('on-success', res, file)
}
</script>

<template>
    <el-upload
        :action="action"
        :data="data"
        :name="name"
        :before-upload="beforeUpload"
        :on-exceed="onExceed"
        :on-success="onSuccess"
        :file-list="files"
        :limit="max"
        drag
    >
        <div class="slot">
            <el-icon class="el-icon--upload"><el-icon-upload-filled /></el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <template #tip>
            <div v-if="!notip" class="el-upload__tip">
                <div style="display: inline-block;">
                    <el-alert :title="`上传文件支持 ${ ext.join(' / ') } 格式，单个文件大小不超过 ${ size }MB，且文件数量不超过 ${ max } 个`" type="info" show-icon :closable="false" />
                </div>
            </div>
        </template>
    </el-upload>
</template>

<style lang="scss" scoped>
:deep(.el-upload-dragger) {
    width: auto;
    height: auto;
    overflow: unset;
    &.is-dragover {
        border-width: 1px;
    }
}
.slot {
    width: 300px;
    height: 160px;
}
</style>
