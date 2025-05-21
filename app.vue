<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
// import { useImagesStore } from '~/store/images'

// 初始化 Pinia store
// const imagesStore = useImagesStore()

// 生命周期钩子 - 组件挂载时
onMounted(() => {
  // 从本地存储加载已保存的图像
  // imagesStore.loadSavedImages()
  console.log('应用已挂载')
})
</script>

<style>
/* 全局样式 */
body {
  font-family: 'Noto Sans SC', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 使用 TailwindCSS 的暗色模式 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #e5e7eb;
  }
}
</style>