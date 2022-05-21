import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createComponents(isBuild) {
    const resolvers = []
    isBuild && resolvers.push(ElementPlusResolver())
    return components({
        resolvers,
        dirs: ['src/components'],
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/],
        dts: false
    })
}
