<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">创建 AI 图像</h1>
    
    <div class="grid md:grid-cols-2 gap-8">
      <!-- 左侧：图像生成表单 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">输入描述</h2>
        
        <form @submit.prevent="generateImage">
          <div class="mb-4">
            <label for="prompt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">详细描述您想要的图像</label>
            <textarea 
              id="prompt"
              v-model="formData.prompt"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="例如：一只金色的猫咪坐在窗台上，窗外是繁星点点的夜空"
              required
            ></textarea>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">详细的描述将产生更好的结果。</p>
          </div>
          
          <div class="mb-4">
            <label for="style" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">艺术风格</label>
            <select 
              id="style"
              v-model="formData.style"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="realistic">写实风格</option>
              <option value="anime">动漫风格</option>
              <option value="abstract">抽象艺术</option>
              <option value="oil">油画</option>
              <option value="watercolor">水彩</option>
              <option value="sketch">素描</option>
              <option value="digital">数字艺术</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="width" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">宽度</label>
              <select 
                id="width"
                v-model="formData.width"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="512">512px</option>
                <option value="768">768px</option>
                <option value="1024">1024px</option>
              </select>
            </div>
            <div>
              <label for="height" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">高度</label>
              <select 
                id="height"
                v-model="formData.height"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="512">512px</option>
                <option value="768">768px</option>
                <option value="1024">1024px</option>
              </select>
            </div>
          </div>
          
          <div class="mb-6">
            <label for="numImages" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">生成图像数量</label>
            <input 
              type="range" 
              id="numImages" 
              v-model="formData.numImages" 
              min="1" 
              max="4" 
              step="1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button 
              type="submit"
              class="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="isGenerating"
            >
              <span v-if="isGenerating">生成中...</span>
              <span v-else>生成图像</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- 右侧：结果展示区域 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">生成结果</h2>
        
        <div v-if="isGenerating" class="flex flex-col items-center justify-center h-64">
          <div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">AI 正在创作中，请稍候...</p>
        </div>
        
        <div v-else-if="generatedImages.length > 0" class="grid grid-cols-2 gap-4">
          <div v-for="(image, index) in generatedImages" :key="index" class="relative">
            <img 
              :src="image.url" 
              :alt="`生成的图像 ${index + 1}`"
              class="w-full h-auto rounded-md shadow-sm"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="saveToGallery(image)"
                class="p-2 bg-white rounded-full text-gray-900 mr-2"
                title="保存到图库"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <a 
                :href="image.url" 
                download="ai-generated-image.jpg"
                class="p-2 bg-white rounded-full text-gray-900"
                title="下载图像"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div v-else class="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-gray-600 dark:text-gray-300">填写左侧表单并点击"生成图像"按钮开始创作</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 表单数据
const formData = reactive({
  prompt: '',
  style: 'realistic',
  width: '512',
  height: '512',
  numImages: 1
})

// 状态变量
const isGenerating = ref(false)
const generatedImages = ref([])

/**
 * 生成图像函数
 * 在实际应用中，这里会调用AI图像生成API
 */
const generateImage = async () => {
  isGenerating.value = true
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 模拟生成的图像数据
    // 在实际应用中，这里会使用实际API返回的图像URL
    const mockImages = []
    for (let i = 0; i < formData.numImages; i++) {
      mockImages.push({
        id: `img-${Date.now()}-${i}`,
        url: `https://picsum.photos/${formData.width}/${formData.height}?random=${Date.now() + i}`,
        prompt: formData.prompt,
        style: formData.style,
        createdAt: new Date().toISOString()
      })
    }
    
    generatedImages.value = mockImages
  } catch (error) {
    console.error('图像生成失败:', error)
    alert('生成图像时出错，请重试')
  } finally {
    isGenerating.value = false
  }
}

/**
 * 保存图像到画廊
 * @param {Object} image - 要保存的图像对象
 */
const saveToGallery = (image) => {
  // 临时解决方案：仅显示提示消息
  // 在未来添加 Pinia store 后，将改为:
  // const store = useImagesStore()
  // store.saveImage(image)
  alert(`图像已保存到图库（模拟）：${image.id}`)
}
</script>

<style scoped>
/* 生成器页面特定样式 */
</style> 