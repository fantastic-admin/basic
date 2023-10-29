import { viteMockServe } from 'vite-plugin-mock'

export default function createMock(env, isBuild) {
  const { VITE_BUILD_MOCK } = env
  return viteMockServe({
    mockPath: 'src/mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild && VITE_BUILD_MOCK === 'true',
    injectCode: `
import { setupProdMockServer } from './mockProdServer';
setupProdMockServer();
    `,
  })
}
