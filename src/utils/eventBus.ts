import mitt from 'mitt'

interface MittTypes {
  [key: string | symbol]: any
}

export default mitt<MittTypes>()
