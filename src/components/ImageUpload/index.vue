<template>
    <div class="upload-container">
        <el-upload
            :show-file-list="false"
            :headers="headers"
            :action="action"
            :data="data"
            :name="name"
            :before-upload="beforeUpload"
            :on-progress="onProgress"
            :on-success="onSuccess"
            drag
        >
            <el-image v-if="url === ''" :src="url === '' ? placeholder : url" :style="`width:${width}px;height:${height}px;`" fit="fill">
                <div slot="error" class="image-slot">
                    <i class="el-icon-plus" />
                </div>
            </el-image>
            <div v-else class="image">
                <el-image :src="url" :style="`width:${width}px;height:${height}px;`" fit="fill" />
                <div class="mask">
                    <div class="actions">
                        <span title="预览" @click.stop="dialogVisible = true">
                            <i class="el-icon-zoom-in" />
                        </span>
                        <span title="移除" @click.stop="remove">
                            <i class="el-icon-delete" />
                        </span>
                    </div>
                </div>
            </div>
            <div v-show="progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
                <el-image :src="progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
                <el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="progress.percent" />
            </div>
        </el-upload>
        <div v-if="!notip" class="el-upload__tip">
            <div style="display: inline-block;">
                <el-alert :title="`上传图片支持 ${ ext.join(' / ') } 格式，且图片大小不超过 ${ size }MB，建议图片尺寸为 ${width}*${height}`" type="info" show-icon :closable="false" />
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="预览" width="800px">
            <img :src="url" style="display: block; max-width: 100%; margin: 0 auto;">
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ImageUpload',
    props: {
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
            type: String,
            default: ''
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
    },
    data() {
        return {
            dialogVisible: false,
            progress: {
                preview: '',
                percent: 0
            }
        }
    },
    methods: {
        // 移除
        remove() {
            this.$emit('update:url', '')
        },
        beforeUpload(file) {
            const fileName = file.name.split('.')
            const fileExt = fileName[fileName.length - 1]
            const isTypeOk = this.ext.indexOf(fileExt) >= 0
            const isSizeOk = file.size / 1024 / 1024 < this.size
            if (!isTypeOk) {
                this.$message.error(`上传图片只支持 ${ this.ext.join(' / ') } 格式！`)
            }
            if (!isSizeOk) {
                this.$message.error(`上传图片大小不能超过 ${this.size}MB！`)
            }
            if (isTypeOk && isSizeOk) {
                this.progress.preview = URL.createObjectURL(file)
            }
            return isTypeOk && isSizeOk
        },
        onProgress(file) {
            this.progress.percent = ~~file.percent
            if (this.progress.percent == 100) {
                setTimeout(() => {
                    this.progress.preview = ''
                    this.progress.percent = 0
                }, 1000)
            }
        },
        onSuccess(res) {
            this.$emit('on-success', res)
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-container {
    line-height: initial;
}
.image {
    position: relative;
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
::v-deep .el-upload {
    .el-upload-dragger {
        width: auto;
        height: auto;
        &.is-dragover {
            border-width: 1px;
        }
        .el-image {
            display: block;
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
