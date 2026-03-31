import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('standard_module/list', {
    params: data,
    fake: true,
  }),

  detail: (id: number | string) => api.get('standard_module/detail', {
    params: {
      id,
    },
    fake: true,
  }),

  create: (data: any) => api.post('standard_module/create', data, {
    fake: true,
  }),

  edit: (data: any) => api.post('standard_module/edit', data, {
    fake: true,
  }),

  delete: (id: number | string) => api.post('standard_module/delete', {
    id,
  }, {
    fake: true,
  }),
}
