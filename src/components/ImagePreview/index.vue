<template>
    <div>
        <el-image class="img" :src="src" fit="cover" :style="`width:${realWidth};height:${realHeight};`" @click="dialogVisible = true">
            <div slot="error" class="image-slot">
                <svg-icon name="image-load-fail" />
            </div>
        </el-image>
        <el-dialog :visible.sync="dialogVisible" title="预览" width="800px">
            <img :src="src" style="display: block; max-width: 100%; margin: 0 auto;">
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ImagePreview',
    props: {
        src: {
            type: String,
            required: true
        },
        width: {
            type: [Number, String],
            default: ''
        },
        height: {
            type: [Number, String],
            default: ''
        }
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    computed: {
        realWidth() {
            return typeof this.width == 'string' ? this.width : `${this.width}px`
        },
        realHeight() {
            return typeof this.height == 'string' ? this.height : `${this.height}px`
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.el-image {
    border-radius: 5px;
    background-color: #ebeef5;
    ::v-deep .el-image__inner {
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
            transform: scale(1.2) rotateZ(-10deg);
        }
    }
    ::v-deep .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #909399;
        font-size: 30px;
    }
}
</style>
