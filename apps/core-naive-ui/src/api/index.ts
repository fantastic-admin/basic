import axios from 'axios'
// import qs from 'qs'

// 请求重试配置
const MAX_RETRY_COUNT = 3 // 最大重试次数
const RETRY_DELAY = 1000 // 重试延迟时间（毫秒）

// 扩展 AxiosRequestConfig 类型
declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: boolean
    retryCount?: number
    fake?: boolean
  }
}

const api = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_ENABLE_PROXY) ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

api.interceptors.request.use(
  (request) => {
    // 如果设置了 fake 属性，强制使用 fake 的 baseURL
    if (request.fake) {
      request.baseURL = '/fake/'
    }
    // 全局拦截请求发送前提交的参数
    const appAccountStore = useAppAccountStore()
    // 设置请求头
    if (request.headers) {
      request.headers['Accept-Language'] = 'zh-CN'
      if (appAccountStore.isLogin) {
        request.headers.Token = appAccountStore.token
      }
    }
    // 是否将 POST 请求参数进行字符串化处理
    if (request.method === 'post') {
      // request.data = qs.stringify(request.data, {
      //   arrayFormat: 'brackets',
      // })
    }
    return request
  },
)

// 处理错误信息的函数
function handleError(error: any) {
  if (error.status === 401) {
    useAppAccountStore().requestLogout()
  }
  else {
    faToast.error('Error', {
      description: error.message,
    })
  }
  return Promise.reject(error)
}

api.interceptors.response.use(
  (response) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 约定的数据格式：{ status: 1 | 0, error: string, data: object }
     * status 只有两种状态，1 表示请求成功，0 表示接口需要登录或者登录状态失效，需要重新登录
     * error 只有在请求出错时才会有值，表示错误信息
     * data 只有在请求成功时才会有值，表示请求返回的数据
     */
    if (typeof response.data === 'object') {
      if (response.data.status === 1) {
        if (response.data.error) {
          faToast.warning('Warning', {
            description: response.data.error,
          })
          return Promise.reject(response.data)
        }
      }
      else {
        useAppAccountStore().requestLogout()
      }
      return Promise.resolve(response.data)
    }
    else {
      return Promise.reject(response.data)
    }
  },
  async (error) => {
    // 获取请求配置
    const config = error.config
    // 如果配置不存在或未启用重试，则直接处理错误
    if (!config || !config.retry) {
      return handleError(error)
    }
    // 设置重试次数
    config.retryCount = config.retryCount || 0
    // 判断是否超过重试次数
    if (config.retryCount >= MAX_RETRY_COUNT) {
      return handleError(error)
    }
    // 重试次数自增
    config.retryCount += 1
    // 延迟重试
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
    // 重新发起请求
    return api(config)
  },
)

export default api
