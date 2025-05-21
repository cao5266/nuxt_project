<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          AI图像生成器
        </NuxtLink>
        <div class="flex space-x-6">
          <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            首页
          </NuxtLink>
          <NuxtLink to="/generator" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            生成图像
          </NuxtLink>
          <NuxtLink to="/gallery" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            图片库
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© 2023 AI图像生成器 - 基于人工智能的图像创作平台</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 布局逻辑
</script>

<style>
/* 全局样式可以放在这里 */
</style> 