import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const mocks: any[] = []
const mockContext = import.meta.glob('./mock/*.ts', { eager: true })
Object.keys(mockContext).forEach((v) => {
  mocks.push(...(mockContext[v] as any).default)
})

export function setupProdMockServer() {
  createProdMockServer(mocks)
}
