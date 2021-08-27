<template>
    <div>
        <slot v-if="check()" />
        <slot v-else name="no-auth" />
    </div>
</template>

<script>
import { authAll } from '@/util'

export default {
    name: 'AuthAll',
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        check() {
            return authAll(this.value)
        }
    }
}
</script>
