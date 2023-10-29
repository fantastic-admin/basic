import MultilevelMenuExample from './modules/multilevel.menu.example'

import type { Menu } from '#/global'

const menu: Menu.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'uim:box',
    },
    children: [
      MultilevelMenuExample,
    ],
  },
]

export default menu
