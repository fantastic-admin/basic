let mockMap = {}

const mocksContext = require.context('./server-modules/', false, /.js$/)
mocksContext.keys().forEach(file_name => {
    mockMap = Object.assign(mockMap, mocksContext(file_name).default)
})

export default mockMap
