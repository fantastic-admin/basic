export default [
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }: any) => {
      return {
        error: '',
        status: 1,
        data: {
          account: body.account,
          token: `${body.account}_@string`,
          failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60,
        },
      }
    },
  },
  {
    url: '/mock/user/permission',
    method: 'get',
    response: ({ headers }: any) => {
      let permissions: string[] = []
      if (headers.token.indexOf('admin') === 0) {
        permissions = [
          'permission.browse',
          'permission.create',
          'permission.edit',
          'permission.remove',
        ]
      }
      else if (headers.token.indexOf('test') === 0) {
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
    url: '/mock/user/password/edit',
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
