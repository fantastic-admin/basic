<template>
    <div>
        <div class="bg-banner" />
        <div id="login-box">
            <div class="login-banner" />
            <el-form v-show="formType == 'login'" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
                <div class="title-container">
                    <h3 class="title">{{ title }}管理后台</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input ref="name" v-model="loginForm.account" placeholder="用户名" type="text" tabindex="1" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" tabindex="2" autocomplete="on" @keyup.enter="handleLogin">
                            <template #prefix>
                                <svg-icon name="password" />
                            </template>
                            <template #suffix>
                                <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="flex-bar">
                    <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
                    <el-button type="text" @click="formType = 'reset'">忘记密码</el-button>
                </div>
                <el-button :loading="loading" type="primary" style="width: 100%;" @click.prevent="handleLogin">登 录</el-button>
                <div style="margin-top: 20px; margin-bottom: -10px; color: #666; font-size: 14px; text-align: center; font-weight: bold;">
                    <span style="margin-right: 5px;">演示帐号一键登录：</span>
                    <el-button type="danger" size="mini" @click="testAccount('admin')">admin</el-button>
                    <el-button type="danger" size="mini" plain @click="testAccount('test')">test</el-button>
                </div>
            </el-form>
            <el-form v-show="formType == 'reset'" ref="resetForm" :model="resetForm" :rules="resetRules" class="login-form" auto-complete="on" label-position="left">
                <div class="title-container">
                    <h3 class="title">重置密码</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input ref="name" v-model="resetForm.account" placeholder="用户名" type="text" tabindex="1" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <el-input ref="captcha" v-model="resetForm.captcha" placeholder="验证码" type="text" tabindex="2" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="captcha" />
                            </template>
                            <template #append>
                                <el-button>发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="newPassword">
                        <el-input ref="newPassword" v-model="resetForm.newPassword" :type="passwordType" placeholder="新密码" tabindex="3" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="password" />
                            </template>
                            <template #suffix>
                                <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-row :gutter="15" style="padding-top: 20px;">
                    <el-col :md="6">
                        <el-button style="width: 100%;" @click="formType = 'login'">去登录</el-button>
                    </el-col>
                    <el-col :md="18">
                        <el-button :loading="loading" type="primary" style="width: 100%;" @click.prevent="handleFind">确 认</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <Copyright v-if="$store.state.settings.showCopyright" />
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            title: import.meta.env.VITE_APP_TITLE,
            // 表单类型，login 登录，reset 重置密码
            formType: 'login',
            loginForm: {
                account: localStorage.login_account || '',
                password: '',
                remember: !!localStorage.login_account
            },
            loginRules: {
                account: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' },
                    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
                ]
            },
            resetForm: {
                account: localStorage.login_account || '',
                captcha: '',
                newPassword: ''
            },
            resetRules: {
                account: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                captcha: [
                    { required: true, trigger: 'blur', message: '请输入验证码' }
                ],
                newPassword: [
                    { required: true, trigger: 'blur', message: '请输入新密码' },
                    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
                ]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        showPassword() {
            this.passwordType = this.passwordType === 'password' ? '' : 'password'
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.loading = false
                        if (this.loginForm.remember) {
                            localStorage.setItem('login_account', this.loginForm.account)
                        } else {
                            localStorage.removeItem('login_account')
                        }
                        this.$router.push({ path: this.redirect || '/' })
                    }).catch(() => {
                        this.loading = false
                    })
                }
            })
        },
        handleFind() {
            this.$message({
                message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
                type: 'info'
            })
            this.$refs.resetForm.validate(valid => {
                if (valid) {
                    // 这里编写业务代码
                }
            })
        },
        testAccount(account) {
            this.loginForm.account = account
            this.loginForm.password = '123456'
            this.handleLogin()
        }
    }
}
</script>

<style lang="scss" scoped>
[data-mode=mobile] {
    #login-box {
        max-width: 80%;
        .login-banner {
            display: none;
        }
    }
}
:deep(input[type=password]::-ms-reveal) {
    display: none;
}
.bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/login-bg.jpg);
    background-size: cover;
    background-position: center center;
}
#login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px #999;
    .login-banner {
        width: 300px;
        background-image: url(../assets/images/login-banner.jpg);
        background-size: cover;
        background-position: center center;
    }
    .login-form {
        width: 450px;
        padding: 50px 35px 30px;
        overflow: hidden;
        .title-container {
            position: relative;
            .title {
                font-size: 22px;
                color: #666;
                margin: 0 auto 30px;
                text-align: center;
                font-weight: bold;
                @include text-overflow;
            }
        }
    }
    :deep(.el-input) {
        height: 48px;
        line-height: inherit;
        width: 100%;
        input {
            height: 48px;
        }
        .el-input__prefix,
        .el-input__suffix {
            display: flex;
            align-items: center;
        }
        .el-input__prefix {
            left: 10px;
        }
        .el-input__suffix {
            right: 10px;
        }
    }
    .flex-bar {
        display: flex;
        justify-content: space-between;
    }
    .el-checkbox {
        margin: 20px 0;
    }
}
.copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin: 0;
    mix-blend-mode: difference;
}
</style>
