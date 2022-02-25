import Layouts from 'vite-plugin-vue-layouts'

export default function createPages() {
    return Layouts({
        layoutsDirs: 'src/layout',
        defaultLayout: 'index'
    })
}
