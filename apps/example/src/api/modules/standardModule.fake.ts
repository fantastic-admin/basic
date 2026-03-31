import { faker } from '@faker-js/faker'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

// 标准模块
const standardModuleList: any[] = []
for (let i = 0; i < 50; i++) {
  standardModuleList.push({
    id: i + 1,
    title: faker.book.title(),
  })
}

export default defineFakeRoute([
  {
    url: '/fake/standard_module/list',
    method: 'get',
    response: ({ query }) => {
      const { title, from, limit } = query
      const list = standardModuleList.filter((item) => {
        return title ? item.title.includes(title) : true
      })
      const pageList = list.filter((_item, index) => {
        return index >= ~~from && index < (~~from + ~~limit)
      })
      return {
        error: '',
        status: 1,
        data: {
          list: pageList,
          total: list.length,
        },
      }
    },
  },
  {
    url: '/fake/standard_module/detail',
    method: 'get',
    response: ({ query }) => {
      const info = standardModuleList.filter(item => item.id === ~~query.id)
      return {
        error: '',
        status: 1,
        data: info[0],
      }
    },
  },
  {
    url: '/fake/standard_module/create',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
  {
    url: '/fake/standard_module/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
  {
    url: '/fake/standard_module/delete',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
])
