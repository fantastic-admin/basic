<template>
    <div>
        <page-main>
            <editor v-model="form.content" />
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                content: '<p>初始化文字</p>'
            }
        }
    }
}
</script>
