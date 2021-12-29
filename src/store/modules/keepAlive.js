import { defineStore } from 'pinia'
import { piniaStore } from '@/store'

export const useKeepAliveStore = defineStore(
    // 唯一ID
    'keepAlive',
    {
        state: () => ({
            list: []
        }),
        actions: {
            add(name) {
                if (typeof name === 'string') {
                    !this.list.includes(name) && this.list.push(name)
                } else {
                    name.map(v => {
                        v && !this.list.includes(v) && this.list.push(v)
                    })
                }
            },
            remove(name) {
                if (typeof name === 'string') {
                    this.list = this.list.filter(v => {
                        return v !== name
                    })
                } else {
                    this.list = this.list.filter(v => {
                        return !name.includes(v)
                    })
                }
            },
            clean() {
                this.list = []
            }
        }
    }
)

export function useKeepAliveOutsideStore() {
    return useKeepAliveStore(piniaStore)
}
