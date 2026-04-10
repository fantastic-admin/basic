export function usePagination() {
  const pagination = ref({
    page: 1,
    size: 10,
    total: 0,
    sort: null as string | null,
    order: null as string | null,
  })

  function getParams() {
    return {
      // page,size 和 from,limit 是分页的两种方式，方便兼容两种接口
      page: pagination.value.page,
      size: pagination.value.size,
      from: (pagination.value.page - 1) * pagination.value.size,
      limit: pagination.value.size,
      ...(
        pagination.value.sort && pagination.value.order && {
          sort: pagination.value.sort,
          order: pagination.value.order,
        }
      ),
    }
  }

  async function onSizeChange(size: number) {
    pagination.value.size = size
  }

  async function onCurrentChange(page: number) {
    pagination.value.page = page
  }

  async function onSortChange(prop: string, order: string) {
    pagination.value.sort = prop
    pagination.value.order = order === 'ascending' ? 'asc' : 'desc'
  }

  return {
    pagination,
    getParams,
    onSizeChange,
    onCurrentChange,
    onSortChange,
  }
}
