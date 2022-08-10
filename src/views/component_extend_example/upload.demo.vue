<route>
{
    meta: {
        enabled: false
    }
}
</route>

<script setup>
const image = ref('https://picsum.photos/400')
const images = ref([
    'https://picsum.photos/400',
    'https://picsum.photos/600',
    'https://picsum.photos/500'
])
const files = ref([
    {
        name: '测试文件.zip',
        url: 'http://images.lookbi.com/uploads/apply/96/d8521fc691e472eec91a170201866e7d.zip'
    }
])

function handleSuccess1(res) {
    if (res.error === '')
        image.value = res.data.path

    else
        ElMessage.warning(res.error)
}
function handleSuccess2(res) {
    if (res.error === '')
        images.value.push(res.data.path)

    else
        ElMessage.warning(res.error)
}
function handleSuccess3(res, file, fileList) {
    if (res.error === '') {
        files.value.push({
            name: file.name,
            url: res.error === '' ? res.data.path : ''
        })
    } else {
        fileList.pop()
        ElMessage.warning(res.error)
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
            <file-upload :files="files" action="https://run.mocky.io/v3/e868a535-2569-4ba1-acad-fa10be2cef9e" @on-success="handleSuccess3" />
        </page-main>
    </div>
</template>
