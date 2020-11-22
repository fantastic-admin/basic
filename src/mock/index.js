const Mock = require('mockjs')

export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

function XHR2ExpressReqWrap(respond) {
    return function(options) {
        let result = null
        if (respond instanceof Function) {
            const { body, type, url } = options
            // https://expressjs.com/en/4x/api.html#req
            result = respond({
                method: type,
                body: JSON.parse(body),
                query: param2Obj(url)
            })
        } else {
            result = respond
        }
        return Mock.mock(result)
    }
}
const mocksContext = require.context('./modules/', true, /.js$/)
mocksContext.keys().forEach(file_name => {
    // 获取文件中的 default 模块
    const mocks = mocksContext(file_name)
    for (const mock of mocks) {
        Mock.mock(
            new RegExp(`${process.env.VUE_APP_API_ROOT}mock/${mock.url}`),
            mock.type || 'get',
            XHR2ExpressReqWrap(mock.result)
        )
    }
})
