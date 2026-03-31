import api from '../index'

export default {
  // 后端获取路由数据
  routeList: () => api.get('app/route/list', {
    fake: true,
  }),

  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post('app/account/login', data, {
    fake: true,
  }),

  // 获取权限
  permission: () => api.get('app/account/permission', {
    fake: true,
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newPassword: string
  }) => api.post('app/account/password/edit', data, {
    fake: true,
  }),

}
