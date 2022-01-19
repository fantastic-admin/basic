import components from 'unplugin-vue-components/vite'

export default function createComponents() {
    return components({
        dirs: ['src/components'],
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/]
    })
}
