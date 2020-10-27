<template>
    <div>
        <!-- 页面：Setting -->
        <page-main>
            <el-tabs tab-position="left" style="height: 600px;">
                <el-tab-pane label="基本设置" class="basic">
                    <h2>基本设置</h2>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form ref="form" :model="form" label-width="120px" label-suffix="：">
                                <el-form-item label="名 称">
                                    <el-input v-model="form.name" placeholder="请输入你的名称" />
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <el-input v-model="form.mobile" placeholder="请输入你的手机号" />
                                </el-form-item>
                                <el-form-item label="QQ 号">
                                    <el-input v-model="form.qq" placeholder="请输入你的 QQ 号" />
                                </el-form-item>
                                <el-form-item label="微信号">
                                    <el-input v-model="form.wechat" placeholder="请输入你的微信号" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <image-upload :url.sync="form.headimg" action="http://scrm.1daas.com/api/upload/upload" name="image" :data="{'token':'TKD628431923530324'}" notip class="headimg-upload" @onSuccess="handleSuccess" />
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="安全设置" class="security">
                    <h2>安全设置</h2>
                    <div class="setting-list">
                        <div class="item">
                            <div class="content">
                                <div class="title">账户密码</div>
                                <div class="desc">当前密码强度：强</div>
                            </div>
                            <div class="action">
                                <el-button type="text" @click="editPassword">修改</el-button>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <div class="title">密保手机</div>
                                <div class="desc">已绑定手机：187****3441</div>
                            </div>
                            <div class="action">
                                <el-button type="text">修改</el-button>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <div class="title">备用邮箱</div>
                                <div class="desc">当前未绑定备用邮箱</div>
                            </div>
                            <div class="action">
                                <el-button type="text">绑定</el-button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'PersonalSetting',
    beforeRouteLeave(to, from, next) {
        if (['personalEditPassword'].includes(to.name)) {
            this.$store.commit('keepAlive/add', 'PersonalSetting')
        }
        next()
    },
    props: {},
    data() {
        return {
            form: {
                headimg: '',
                mobile: '',
                name: '',
                qq: '',
                wechat: ''
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
        handleSuccess(res) {
            if (res.error == '') {
                this.form.headimg = res.data.path
            } else {
                this.$message.warning(res.error)
            }
        },
        editPassword() {
            this.$router.push({
                name: 'personalEditPassword'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs {
    .el-tabs__header .el-tabs__nav {
        .el-tabs__active-bar {
            z-index: 0;
            width: 100%;
            background-color: #e1f0ff;
            border-right: 2px solid #409eff;
        }
        .el-tabs__item {
            text-align: left;
            padding-right: 100px;
        }
    }
    .el-tab-pane {
        padding: 0 20px 0 30px;
    }
}
h2 {
    margin: 0;
    margin-bottom: 30px;
    font-weight: normal;
}
.basic {
    ::v-deep .headimg-upload {
        > div {
            text-align: center;
        }
        .el-upload-dragger {
            border-radius: 50%;
        }
    }
}
.security {
    .setting-list {
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e8e8e8;
            .content {
                .title {
                    margin-bottom: 5px;
                    color: #666;
                }
                .desc {
                    font-size: 14px;
                    color: #999;
                }
            }
            &:last-child {
                border-bottom: 0;
            }
        }
    }
}
</style>
