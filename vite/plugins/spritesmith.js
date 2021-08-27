import spritesmith from 'vite-plugin-spritesmith'
import fs from 'fs'

export default function createSpritesmith(isBuild) {
    const spriteDirnames = []
    fs.readdirSync('src/assets/sprites').map(dirname => {
        if (fs.statSync(`src/assets/sprites/${dirname}`).isDirectory()) {
            spriteDirnames.push(dirname)
        }
    })
    const plugin = []
    spriteDirnames.map(item => {
        plugin.push(
            spritesmith({
                watch: !isBuild,
                src: {
                    cwd: `./src/assets/sprites/${item}`,
                    glob: '*.png'
                },
                target: {
                    image: `./src/assets/sprites/${item}.png`,
                    css: [
                        [
                            `./src/assets/sprites/_${item}.scss`,
                            {
                                format: 'handlebars_based_template'
                            }
                        ]
                    ]
                },
                apiOptions: {
                    cssImageRef: `@/assets/sprites/${item}.png`,
                    spritesheet_info: {
                        name: item,
                        format: 'handlebars_based_template'
                    }
                },
                customTemplates: {
                    handlebars_based_template: './scss.template.hbs'
                },
                spritesmithOptions: {
                    algorithm: 'binary-tree',
                    padding: 10
                }
            })
        )
    })
    return plugin
}
