if (!import.meta.env.DEV) {
  const _hmt = []
  _hmt.push(['_requirePlugin', 'UrlChangeTracker', {
    shouldTrackUrlChange(newPath: any, oldPath: any) {
      return newPath && oldPath
    },
  }]);
  (function () {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?7bb58fdfd1fe8ab146d4b4f23686b768'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode?.insertBefore(hm, s)
  })()
}

export {}
