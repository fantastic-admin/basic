let mockMap = {}

const mocksContext = require.context('./server-modules/', false, /.js$/)
mocksContext.keys().forEach(file_name => {
    mockMap = {
        ...mocksContext(file_name)
    }
})

module.exports = mockMap
