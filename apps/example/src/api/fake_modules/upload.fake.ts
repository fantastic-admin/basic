import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/fake/upload',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          url: 'https://fantastic-admin.hurui.me/logo.svg',
        },
      }
    },
  },
])
