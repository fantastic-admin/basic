<template>
    <div>
        <slot v-if="check()" />
        <slot v-else name="no-auth" />
    </div>
</template>

<script setup>
import { authAll } from '@/util'

const props = defineProps({
    value: {
        type: Array,
        default: () => []
    }
})

function check() {
    return authAll(props.value)
}
</script>
