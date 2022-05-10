<route>
{
    meta: {
        enabled: false
    }
}
</route>

<script setup>
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

function getPermission() {
    userStore.getPermissions().then(res => {
        ElNotification({
            title: '当前用户权限',
            dangerouslyUseHTMLString: true,
            message: res.map(p => `<p>${p}</p>`).join('')
        })
    })
}

function open(url) {
    window.open(url, 'top')
}
</script>

<template>
    <div>
        <page-header title="Mock" content="通过拦截 Ajax 请求，返回模拟的响应数据，可以让前端工程师独立于后端进行开发，本演示站的登录和权限获取就是通过 mock 实现的。更多 Mock 语法规则请查询官方文档">
            <el-button @click="open('http://mockjs.com/')">
                <template #icon>
                    <el-icon>
                        <svg-icon name="ep:link" />
                    </el-icon>
                </template>
                Mock.js 官网
            </el-button>
        </page-header>
        <page-main>
            <el-button @click="getPermission">测试：获取用户权限</el-button>
        </page-main>
    </div>
</template>
