import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./index'],
  declaration: false,
  clean: true,
})
