export default [
  {
    url: '/mock/member/login',
    method: 'post',
    response: (option: any) => {
      return {
        error: '',
        status: 1,
        data: {
          account: option.body.account,
          token: `${option.body.account}_@string`,
          failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60,
        },
      }
    },
  },
  {
    url: '/mock/member/permission',
    method: 'get',
    response: (option: any) => {
      let permissions: string[] = []
      if (option.headers.token.indexOf('admin') === 0) {
        permissions = [
          'permission.browse',
          'permission.create',
          'permission.edit',
          'permission.remove',
        ]
      }
      else if (option.headers.token.indexOf('test') === 0) {
        permissions = [
          'permission.browse',
        ]
      }
      return {
        error: '',
        status: 1,
        data: {
          permissions,
        },
      }
    },
  },
  {
    url: '/mock/member/edit/password',
    method: 'post',
    response: {
      error: '',
      status: 1,
      data: {
        isSuccess: true,
      },
    },
  },
]
