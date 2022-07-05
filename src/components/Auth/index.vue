<script setup name="Auth">
import { useAuth } from '@/util/composables'

const props = defineProps({
    value: {
        type: [String, Array],
        default: ''
    }
})

function check() {
    return useAuth().auth(props.value)
}
</script>

<template>
    <div>
        <slot v-if="check()" />
        <slot v-else name="no-auth" />
    </div>
</template>
