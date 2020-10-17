<template>
    <div>
        <page-main>
            <div>当前权限：{{ $store.state.global.openPermission ? '开' : '关' }}</div>
            <div v-if="!$store.state.global.openPermission">请到 seeting.js 里打开权限功能，再进入该页面查看演示</div>
            <div v-else>
                <div>请对照代码查看演示</div>
                <auth value="permission.browse">
                    如果你有 permission.browse 权限则能看到这句话
                </auth>
                <auth value="permission.create">
                    如果你有 permission.create 权限则能看到这句话
                </auth>
                <auth :value="['permission.browse', 'permission.create']">
                    如果你有 permission.browse 或 permission.create 权限则能看到这句话
                </auth>
                <auth-all :value="['permission.browse', 'permission.create']">
                    如果你有 permission.browse 和 permission.create 权限则能看到这句话
                </auth-all>
                <el-button @click="permissionCheck('permission.browse')">校验 permission.browse 权限</el-button>
                <el-button @click="permissionCheck('permission.create')">校验 permission.create 权限</el-button>
                <el-button @click="permissionCheck(['permission.browse', 'permission.create'])">校验 permission.browse 或 permission.create 权限</el-button>
                <el-button @click="permissionCheck2(['permission.browse', 'permission.create'])">校验 permission.browse 和 permission.create 权限</el-button>
            </div>
        </page-main>
    </div>
</template>

<script>
export default {
    methods: {
        permissionCheck(permissions) {
            if (this.$auth(permissions)) {
                this.$message.success('校验通过')
            } else {
                this.$message.error('校验不通过')
            }
        },
        permissionCheck2(permissions) {
            if (this.$authAll(permissions)) {
                this.$message.success('校验通过')
            } else {
                this.$message.error('校验不通过')
            }
        }
    }
}
</script>
