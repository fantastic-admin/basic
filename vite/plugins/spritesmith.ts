import fs from 'fs'
import spritesmith from 'vite-plugin-spritesmith'

export default function createSpritesmith(isBuild) {
  const spriteDirnames: string[] = []
  fs.readdirSync('src/assets/sprites').forEach((dirname) => {
    if (fs.statSync(`src/assets/sprites/${dirname}`).isDirectory()) {
      spriteDirnames.push(dirname)
    }
  })
  const plugin: any[] = []
  spriteDirnames.forEach((item) => {
    plugin.push(
      spritesmith({
        watch: !isBuild,
        src: {
          cwd: `./src/assets/sprites/${item}`,
          glob: '*.png',
        },
        target: {
          image: `./src/assets/sprites/${item}.png`,
          css: [
            [
              `./src/assets/sprites/_${item}.scss`,
              {
                format: 'handlebars_based_template',
              },
            ],
          ],
        },
        apiOptions: {
          cssImageRef: `@/assets/sprites/${item}.png`,
          spritesheet_info: {
            name: item,
            format: 'handlebars_based_template',
          },
        },
        customTemplates: {
          handlebars_based_template: './scss.template.hbs',
        },
        spritesmithOptions: {
          algorithm: 'binary-tree',
          padding: 10,
        },
      }),
    )
  })
  return plugin
}
