import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const mocks: any[] = []
const mockContext: any = import.meta.glob('./mock/*.js', { eager: true })
Object.keys(mockContext).forEach((v) => {
  mocks.push(...mockContext[v].default)
})

export function setupProdMockServer() {
  createProdMockServer(mocks)
}
