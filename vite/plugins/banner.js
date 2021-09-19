import banner from 'vite-plugin-banner'

export default function createBanner() {
    return banner(`
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    `)
}
