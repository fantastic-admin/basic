<route>
{
    meta: {
        enabled: false
    }
}
</route>

<script>
export default {
    data() {
        return {
            image: '',
            images: [],
            files: [
                {
                    name: '测试文件.zip',
                    url: 'http://images.lookbi.com/uploads/apply/96/d8521fc691e472eec91a170201866e7d.zip'
                }
            ]
        }
    },
    mounted() {
        this.image = 'https://picsum.photos/400'
        this.images = [
            'https://picsum.photos/400',
            'https://picsum.photos/600',
            'https://picsum.photos/500'
        ]
    },
    methods: {
        handleSuccess1(res) {
            if (res.error == '') {
                this.image = res.data.path
            } else {
                this.$message.warning(res.error)
            }
        },
        handleSuccess2(res) {
            if (res.error == '') {
                this.images.push(res.data.path)
            } else {
                this.$message.warning(res.error)
            }
        },
        handleSuccess3(res, file) {
            this.files.push({
                name: file.name,
                url: res.error == '' ? res.data.path : ''
            })
            this.$nextTick(() => {
                if (res.error != '') {
                    this.$message.warning(res.error)
                    this.files.pop()
                }
            })
        }
    }
}
</script>

<template>
    <div>
        <page-header title="上传" content="ImageUpload / ImagesUpload / FileUpload" />
        <page-main title="单图上传">
            <image-upload v-model:url="image" action="http://scrm.1daas.com/api/upload/upload" name="image" :width="250" :height="150" :data="{'token':'TKE615916022101558'}" @on-success="handleSuccess1" />
        </page-main>
        <page-main title="多图上传（默认最多3张）">
            <images-upload v-model:url="images" action="http://scrm.1daas.com/api/upload/upload" name="image" :data="{'token':'TKE615916022101558'}" @on-success="handleSuccess2" />
        </page-main>
        <page-main title="文件上传（默认最多3个）">
            <file-upload :files="files" action="http://scrm.1daas.com/api/upload/upload" name="image" :data="{'token':'TKE615916022101558'}" @on-success="handleSuccess3" />
        </page-main>
    </div>
</template>
