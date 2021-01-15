<template>
    <div>
        <page-header title="上传" content="ImageUpload / ImagesUpload / FileUpload" />
        <page-main title="单图上传">
            <image-upload :url.sync="image" action="http://scrm.1daas.com/api/upload/upload" name="image" :width="250" :height="150" :data="{'token':'TKD628431923530324'}" @onSuccess="handleSuccess1" />
        </page-main>
        <page-main title="多图上传（默认最多3张）">
            <images-upload :url="images" action="http://scrm.1daas.com/api/upload/upload" name="image" :data="{'token':'TKD628431923530324'}" @onSuccess="handleSuccess2" />
        </page-main>
        <page-main title="文件上传（默认最多3个）">
            <file-upload :files="files" action="http://scrm.1daas.com/api/upload/upload" name="image" :data="{'token':'TKD628431923530324'}" @onSuccess="handleSuccess3" />
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            image: '',
            images: [
                'https://picsum.photos/400',
                'https://picsum.photos/600',
                'https://picsum.photos/500'
            ],
            files: [
                {
                    name: '测试文件.zip',
                    url: 'http://images.lookbi.com/uploads/apply/96/d8521fc691e472eec91a170201866e7d.zip'
                }
            ]
        }
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
