export const lightTheme = {
  // shadcn
  '--background': '1 0 0', // oklch(1 0 0)
  '--foreground': '0.145 0 0', // oklch(0.145 0 0)
  '--card': '1 0 0', // oklch(1 0 0)
  '--card-foreground': '0.145 0 0', // oklch(0.145 0 0)
  '--popover': '1 0 0', // oklch(1 0 0)
  '--popover-foreground': '0.145 0 0', // oklch(0.145 0 0)
  '--primary': '0.205 0 0', // oklch(0.205 0 0)
  '--primary-foreground': '0.985 0 0', // oklch(0.985 0 0)
  '--secondary': '0.97 0 0', // oklch(0.97 0 0)
  '--secondary-foreground': '0.205 0 0', // oklch(0.205 0 0)
  '--muted': '0.97 0 0', // oklch(0.97 0 0)
  '--muted-foreground': '0.556 0 0', // oklch(0.556 0 0)
  '--accent': '0.97 0 0', // oklch(0.97 0 0)
  '--accent-foreground': '0.205 0 0', // oklch(0.205 0 0)
  '--destructive': '0.577 0.245 27.325', // oklch(0.577 0.245 27.325)
  '--border': '0.922 0 0', // oklch(0.922 0 0)
  '--input': '0.922 0 0', // oklch(0.922 0 0)
  '--ring': '0.708 0 0', // oklch(0.708 0 0)
  // 主要区域
  '--g-main-area-bg': 'oklch(0.9612 0 0)',
  // 头部
  '--g-header-bg': 'oklch(var(--background))',
  '--g-header-color': 'oklch(var(--foreground))',
  '--g-header-menu-color': 'oklch(var(--accent-foreground))',
  '--g-header-menu-hover-bg': 'oklch(var(--accent))',
  '--g-header-menu-hover-color': 'oklch(var(--accent-foreground))',
  '--g-header-menu-active-bg': 'oklch(var(--primary))',
  '--g-header-menu-active-color': 'oklch(var(--primary-foreground))',
  // 主导航
  '--g-main-sidebar-bg': 'oklch(var(--background))',
  '--g-main-sidebar-menu-color': 'oklch(var(--accent-foreground))',
  '--g-main-sidebar-menu-hover-bg': 'oklch(var(--accent))',
  '--g-main-sidebar-menu-hover-color': 'oklch(var(--accent-foreground))',
  '--g-main-sidebar-menu-active-bg': 'oklch(var(--primary))',
  '--g-main-sidebar-menu-active-color': 'oklch(var(--primary-foreground))',
  // 次导航
  '--g-sub-sidebar-bg': 'oklch(var(--background))',
  '--g-sub-sidebar-menu-color': 'oklch(var(--accent-foreground))',
  '--g-sub-sidebar-menu-hover-bg': 'oklch(var(--accent))',
  '--g-sub-sidebar-menu-hover-color': 'oklch(var(--accent-foreground))',
  '--g-sub-sidebar-menu-active-bg': 'oklch(var(--primary))',
  '--g-sub-sidebar-menu-active-color': 'oklch(var(--primary-foreground))',
  // 标签栏
  '--g-tabbar-bg': 'oklch(var(--background))',
  '--g-tabbar-tab-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-hover-bg': 'oklch(var(--accent) / 50%)',
  '--g-tabbar-tab-hover-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-active-bg': 'oklch(var(--accent))',
  '--g-tabbar-tab-active-color': 'oklch(var(--foreground))',
  // 工具栏
  '--g-toolbar-bg': 'oklch(var(--background))',
} as const

export const darkTheme = {
  // shadcn
  '--background': '0.145 0 0', // oklch(0.145 0 0)
  '--foreground': '0.985 0 0', // oklch(0.985 0 0)
  '--card': '0.205 0 0', // oklch(0.205 0 0)
  '--card-foreground': '0.985 0 0', // oklch(0.985 0 0)
  '--popover': '0.205 0 0', // oklch(0.205 0 0)
  '--popover-foreground': '0.985 0 0', // oklch(0.985 0 0)
  '--primary': '0.922 0 0', // oklch(0.922 0 0)
  '--primary-foreground': '0.205 0 0', // oklch(0.205 0 0)
  '--secondary': '0.269 0 0', // oklch(0.269 0 0)
  '--secondary-foreground': '0.985 0 0', // oklch(0.985 0 0)
  '--muted': '0.269 0 0', // oklch(0.269 0 0)
  '--muted-foreground': '0.708 0 0', // oklch(0.708 0 0)
  '--accent': '0.269 0 0', // oklch(0.269 0 0)
  '--accent-foreground': '0.985 0 0', // oklch(0.985 0 0)
  '--destructive': '0.704 0.191 22.216', // oklch(0.704 0.191 22.216)
  '--border': '0.252 0 0', // oklch(0.252 0 0)
  '--input': '0.341 0 0', // oklch(0.341 0 0)
  '--ring': '0.556 0 0', // oklch(0.556 0 0)
  // 主要区域
  '--g-main-area-bg': 'oklch(var(--background))',
  // 头部
  '--g-header-bg': 'oklch(var(--background))',
  '--g-header-color': 'oklch(var(--foreground))',
  '--g-header-menu-color': 'oklch(var(--muted-foreground))',
  '--g-header-menu-hover-bg': 'oklch(var(--muted))',
  '--g-header-menu-hover-color': 'oklch(var(--muted-foreground))',
  '--g-header-menu-active-bg': 'oklch(var(--accent))',
  '--g-header-menu-active-color': 'oklch(var(--accent-foreground))',
  // 主导航
  '--g-main-sidebar-bg': 'oklch(var(--background))',
  '--g-main-sidebar-menu-color': 'oklch(var(--muted-foreground))',
  '--g-main-sidebar-menu-hover-bg': 'oklch(var(--muted))',
  '--g-main-sidebar-menu-hover-color': 'oklch(var(--muted-foreground))',
  '--g-main-sidebar-menu-active-bg': 'oklch(var(--accent))',
  '--g-main-sidebar-menu-active-color': 'oklch(var(--accent-foreground))',
  // 次导航
  '--g-sub-sidebar-bg': 'oklch(var(--background))',
  '--g-sub-sidebar-menu-color': 'oklch(var(--muted-foreground))',
  '--g-sub-sidebar-menu-hover-bg': 'oklch(var(--muted))',
  '--g-sub-sidebar-menu-hover-color': 'oklch(var(--muted-foreground))',
  '--g-sub-sidebar-menu-active-bg': 'oklch(var(--accent))',
  '--g-sub-sidebar-menu-active-color': 'oklch(var(--accent-foreground))',
  // 标签栏
  '--g-tabbar-bg': 'oklch(var(--background))',
  '--g-tabbar-tab-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-hover-bg': 'oklch(var(--accent) / 50%)',
  '--g-tabbar-tab-hover-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-active-bg': 'oklch(var(--accent))',
  '--g-tabbar-tab-active-color': 'oklch(var(--foreground))',
  // 工具栏
  '--g-toolbar-bg': 'oklch(var(--background))',
} as const
