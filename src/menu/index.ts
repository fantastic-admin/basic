import type { Menu } from '#/global'
import MultilevelMenuExample from './modules/multilevel.menu.example'

import PermissionExample from './modules/permission.example'

const menu: Menu.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'uim:box',
    },
    children: [
      MultilevelMenuExample,
      PermissionExample,
    ],
  },
]

export default menu
