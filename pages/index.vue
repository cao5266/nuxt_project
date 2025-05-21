<template>
  <div>
    <section class="py-10">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">人工智能图像生成平台</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          使用最先进的AI技术，将您的创意转化为精美图像。简单描述您想要的画面，我们的AI将为您创造令人惊叹的艺术作品。
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <div class="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">创建图像</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">通过文字描述，生成独特的AI艺术作品。您可以指定风格、主题和具体元素。</p>
          <BaseButton to="/generator" class="mt-auto">开始创建</BaseButton>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <div class="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">图像库</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">浏览您的创作历史和收藏的图像，下载或分享您喜爱的作品。</p>
          <BaseButton to="/gallery" class="mt-auto">查看图库</BaseButton>
        </div>
      </div>
    </section>

    <section class="py-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl mt-12 p-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">如何使用</h2>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="flex flex-col items-center text-center">
          <div class="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">描述您的想法</h3>
          <p class="text-gray-600 dark:text-gray-300">输入详细的文字描述，越具体的描述将产生越精准的结果。</p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">选择风格和参数</h3>
          <p class="text-gray-600 dark:text-gray-300">调整各种参数如风格、色彩方案和构图，使结果更符合您的期望。</p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">生成并保存</h3>
          <p class="text-gray-600 dark:text-gray-300">AI会生成多个图像供您选择，您可以保存喜欢的作品到您的画廊。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 首页逻辑
</script>

<style scoped>
/* 首页特定样式 */
</style> 