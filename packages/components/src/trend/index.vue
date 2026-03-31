<script setup lang="ts">
defineOptions({
  name: 'FaTrend',
})

const props = withDefaults(
  defineProps<{
    value: string
    type?: 'up' | 'down'
    prefix?: string
    suffix?: string
    reverse?: boolean
    size?: 'small' | 'medium' | 'large'
    variant?: 'default' | 'filled' | 'soft' | 'outline'
  }>(),
  {
    type: 'up',
    prefix: '',
    suffix: '',
    reverse: false,
    size: 'medium',
    variant: 'default',
  },
)

const isUp = computed(() => props.type === 'up')

const isColorUp = computed(() => {
  return props.reverse ? !isUp.value : isUp.value
})

const sizeClasses = {
  small: 'text-xs px-1.5 py-0.5 gap-0.5',
  medium: 'text-sm px-2 py-1 gap-1',
  large: 'text-base px-2.5 py-1.5 gap-1.5',
}
</script>

<template>
  <div
    class="font-medium rounded-full inline-flex transition-all duration-300 items-center"
    :class="[
      sizeClasses[size],
      variant === 'default' && [isColorUp ? 'text-green-500' : 'text-red-500'],
      variant === 'filled' && [
        isColorUp ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' : 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30',
      ],
      variant === 'soft' && [
        isColorUp ? 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400',
      ],
      variant === 'outline' && [
        isColorUp ? 'border border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/5' : 'border border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/5',
      ],
    ]"
  >
    <span v-if="prefix" class="opacity-70">{{ prefix }}</span>
    <span class="tabular-nums">{{ value }}</span>
    <span v-if="suffix" class="opacity-70">{{ suffix }}</span>
    <div class="flex items-center justify-center relative">
      <FaIcon
        :name="isUp ? 'i-ep:caret-top' : 'i-ep:caret-top'"
        :rotate="isUp ? 0 : 180"
        class="transition-transform duration-300"
        :class="[
          size === 'small' ? 'text-[10px]' : size === 'large' ? 'text-lg' : 'text-sm',
          variant === 'filled' ? 'text-white' : (isColorUp ? 'text-green-500' : 'text-red-500'),
        ]"
      />
    </div>
  </div>
</template>
