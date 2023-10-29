import mitt from 'mitt'

interface MittTypes {
  [key: string | symbol]: any
  'global-search-toggle'?: 'menu' | 'tab'
}

export default mitt<MittTypes>()
