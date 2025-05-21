<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
      {
        'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': variant === 'primary',
        'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700': variant === 'secondary',
        'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500': variant === 'danger',
        'opacity-50 cursor-not-allowed': disabled
      },
      className
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script setup>
/**
 * 基础按钮组件
 * @component
 */
defineProps({
  /** 按钮变体类型 */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  /** 路由链接地址，如果提供则渲染为 NuxtLink */
  to: {
    type: [String, Object],
    default: ''
  },
  /** 是否禁用按钮 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 额外的CSS类名 */
  className: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])
</script> 