<script setup name="AuthAll">
import { useAuth } from '@/util/composables'

const props = defineProps({
    value: {
        type: Array,
        default: () => []
    }
})

function check() {
    return useAuth().authAll(props.value)
}
</script>

<template>
    <div>
        <slot v-if="check()" />
        <slot v-else name="no-auth" />
    </div>
</template>
