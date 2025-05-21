<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">我的图库</h1>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索图像..."
            class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div class="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <select
          v-model="filterStyle"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">所有风格</option>
          <option value="realistic">写实风格</option>
          <option value="anime">动漫风格</option>
          <option value="abstract">抽象艺术</option>
          <option value="oil">油画</option>
          <option value="watercolor">水彩</option>
          <option value="sketch">素描</option>
          <option value="digital">数字艺术</option>
        </select>
      </div>
    </div>

    <!-- 图库网格 -->
    <div v-if="filteredImages.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="image in filteredImages" :key="image.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="relative aspect-w-16 aspect-h-12 group cursor-pointer" @click="openImageDetail(image)">
          <img 
            :src="image.url" 
            :alt="image.prompt.substring(0, 30) + '...'" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              @click.stop="downloadImage(image)"
              class="p-2 bg-white rounded-full text-gray-900 mx-2"
              title="下载图像"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button 
              @click.stop="removeImage(image.id)"
              class="p-2 bg-white rounded-full text-red-600 mx-2"
              title="删除图像"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <p class="text-sm text-gray-600 dark:text-gray-300 truncate">{{ image.prompt }}</p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(image.createdAt) }}</span>
            <span class="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">{{ getStyleName(image.style) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">没有找到图像</h3>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        {{ searchQuery || filterStyle ? '没有符合搜索条件的图像' : '您的图库是空的' }}
      </p>
      <NuxtLink
        to="/generator"
        class="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        创建新图像
      </NuxtLink>
    </div>

    <!-- 图像详情模态框 -->
    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">图像详情</h3>
          <button @click="selectedImage = null" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 grid md:grid-cols-2 gap-6">
          <div>
            <img 
              :src="selectedImage.url" 
              :alt="selectedImage.prompt" 
              class="w-full h-auto rounded-md"
            />
          </div>
          <div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">描述</h4>
              <p class="text-gray-900 dark:text-white">{{ selectedImage.prompt }}</p>
            </div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">风格</h4>
              <p class="text-gray-900 dark:text-white">{{ getStyleName(selectedImage.style) }}</p>
            </div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">创建时间</h4>
              <p class="text-gray-900 dark:text-white">{{ formatDate(selectedImage.createdAt, true) }}</p>
            </div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">尺寸</h4>
              <p class="text-gray-900 dark:text-white">{{ selectedImage.width }}px × {{ selectedImage.height }}px</p>
            </div>
            <div class="flex space-x-4 mt-6">
              <button 
                @click="downloadImage(selectedImage)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载图像
              </button>
              <button 
                @click="removeImage(selectedImage.id); selectedImage = null;"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-red-600 dark:text-red-500 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                删除图像
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import { useImagesStore } from '~/store/images'

// 状态变量
const searchQuery = ref('')
const filterStyle = ref('')
const selectedImage = ref(null)

// 使用本地数据而不是 store
// const store = useImagesStore()
// const images = computed(() => store.getAllGalleryImages)

// 模拟数据 - 在集成 Pinia 后会从 store 中获取
const images = ref([
  {
    id: 'img-1',
    url: 'https://picsum.photos/id/237/800/600',
    prompt: '一只黑色拉布拉多犬坐在草地上，阳光洒在它的毛发上',
    style: 'realistic',
    width: 800,
    height: 600,
    createdAt: '2023-10-15T08:30:00Z'
  },
  {
    id: 'img-2',
    url: 'https://picsum.photos/id/1084/800/600',
    prompt: '山脉和湖泊的壮丽风景，日落时分天空呈现橙红色',
    style: 'oil',
    width: 800,
    height: 600,
    createdAt: '2023-10-14T14:45:00Z'
  },
  {
    id: 'img-3',
    url: 'https://picsum.photos/id/110/800/600',
    prompt: '未来主义城市景观，高耸的摩天大楼和飞行汽车',
    style: 'digital',
    width: 800,
    height: 600,
    createdAt: '2023-10-13T09:20:00Z'
  }
])

// 过滤图像
const filteredImages = computed(() => {
  return images.value.filter(image => {
    const matchesSearch = !searchQuery.value || 
      image.prompt.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStyle = !filterStyle.value || image.style === filterStyle.value;
    return matchesSearch && matchesStyle;
  });
})

/**
 * 获取风格的显示名称
 * @param {string} styleKey - 风格的键名
 * @returns {string} 风格的显示名称
 */
const getStyleName = (styleKey) => {
  const styles = {
    'realistic': '写实风格',
    'anime': '动漫风格',
    'abstract': '抽象艺术',
    'oil': '油画',
    'watercolor': '水彩',
    'sketch': '素描',
    'digital': '数字艺术'
  }
  return styles[styleKey] || styleKey
}

/**
 * 格式化日期
 * @param {string} dateString - ISO格式的日期字符串
 * @param {boolean} showTime - 是否显示时间
 * @returns {string} 格式化后的日期字符串
 */
const formatDate = (dateString, showTime = false) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  if (showTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }
  return date.toLocaleDateString('zh-CN', options)
}

/**
 * 打开图像详情
 * @param {Object} image - 图像对象
 */
const openImageDetail = (image) => {
  selectedImage.value = image
}

/**
 * 下载图像
 * @param {Object} image - 图像对象
 */
const downloadImage = (image) => {
  const link = document.createElement('a')
  link.href = image.url
  link.download = `ai-image-${image.id}.jpg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 移除图像
 * @param {string} imageId - 图像ID
 */
const removeImage = (imageId) => {
  // 临时实现：直接修改本地数据
  // 在未来添加 Pinia store 后，将改为:
  // const store = useImagesStore()
  // store.removeImage(imageId)
  images.value = images.value.filter(img => img.id !== imageId)
}
</script>

<style scoped>
/* 添加纵横比容器样式 */
.aspect-w-16 {
  position: relative;
  padding-bottom: 75%; /* 16:12 = 4:3 */
}

.aspect-h-12 {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style> 