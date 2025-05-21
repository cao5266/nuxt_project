<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div class="relative aspect-w-16 aspect-h-12 cursor-pointer" @click="$emit('view', image)">
      <img 
        :src="image.url" 
        :alt="image.prompt.substring(0, 30) + '...'" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div class="flex">
          <button 
            @click.stop="$emit('download', image)"
            class="p-2 bg-white rounded-full text-gray-900 mx-1"
            title="下载图像"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button 
            v-if="inGallery"
            @click.stop="$emit('remove', image.id)"
            class="p-2 bg-white rounded-full text-red-600 mx-1"
            title="删除图像"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button 
            v-else
            @click.stop="$emit('save', image)"
            class="p-2 bg-white rounded-full text-indigo-600 mx-1"
            title="保存到图库"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="p-4">
      <p class="text-sm text-gray-600 dark:text-gray-300 truncate">{{ image.prompt }}</p>
      <div class="flex justify-between items-center mt-2">
        <span v-if="showDate" class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(image.createdAt) }}</span>
        <span class="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">{{ getStyleName(image.style) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 图像卡片组件
 * @component
 */
const props = defineProps({
  /** 图像数据对象 */
  image: {
    type: Object,
    required: true
  },
  /** 是否在图库中显示（影响按钮显示） */
  inGallery: {
    type: Boolean,
    default: false
  },
  /** 是否显示日期 */
  showDate: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['view', 'download', 'save', 'remove'])

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
 * @returns {string} 格式化后的日期字符串
 */
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('zh-CN', options)
}
</script>

<style scoped>
/* 纵横比容器样式 */
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