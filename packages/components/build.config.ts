import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./resolver'],
  declaration: false,
  clean: true,
})
