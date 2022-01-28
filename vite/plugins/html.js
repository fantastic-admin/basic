import { createHtmlPlugin } from 'vite-plugin-html'

const copyright_common_style = 'font-size: 14px; margin-bottom: 2px; padding: 6px 8px; color: #fff;'
const copyright_main_style = `${copyright_common_style} background: #e24329;`
const copyright_sub_style = `${copyright_common_style} background: #707070;`

export default function createHtml(env, isBuild) {
    const { VITE_APP_TITLE, VITE_APP_DEBUG_TOOL } = env
    const html = createHtmlPlugin({
        inject: {
            data: {
                title: VITE_APP_TITLE,
                debugTool: VITE_APP_DEBUG_TOOL,
                copyrightScript: `
<script>
console.info('%c由%cFantastic-admin%c提供技术支持', '${copyright_sub_style}', '${copyright_main_style}', '${copyright_sub_style}', '\\nhttps://hooray.gitee.io/fantastic-admin/');
console.info('%cPowered by%cFantastic-admin', '${copyright_sub_style}', '${copyright_main_style}', '\\nhttps://hooray.github.io/fantastic-admin/');
</script>
                `
            }
        },
        minify: isBuild
    })
    return html
}
