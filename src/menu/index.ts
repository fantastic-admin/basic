import type { Menu } from '#/global'

import MultilevelMenuExample from './modules/multilevel.menu.example'

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
