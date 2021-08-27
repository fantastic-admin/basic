import banner from 'vite-plugin-banner'

export default function createBanner() {
    return banner(`
/**
 * name: Fantastic-admin
 * homepage: https://hooray.gitee.io/fantastic-admin/
 */
    `)
}
