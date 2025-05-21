/**
 * 图像存储模块
 * 管理应用中的图像数据
 */

import { defineStore } from 'pinia'

export const useImagesStore = defineStore('images', {
    state: () => ({
        /**
         * 图库中的图像列表
         * @type {Array<Object>}
         */
        galleryImages: [
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
        ],

        /**
         * 当前生成的图像列表
         * @type {Array<Object>}
         */
        generatedImages: []
    }),

    getters: {
        /**
         * 获取图库中的所有图像
         * @returns {Array<Object>} 图像数组
         */
        getAllGalleryImages: state => state.galleryImages,

        /**
         * 根据ID获取图像
         * @returns {Function} 返回一个接受ID参数的函数
         */
        getImageById: state => id => {
            return state.galleryImages.find(img => img.id === id)
        },

        /**
         * 按风格过滤图像
         * @returns {Function} 返回一个接受风格参数的函数
         */
        getImagesByStyle: state => style => {
            if (!style) return state.galleryImages
            return state.galleryImages.filter(img => img.style === style)
        },

        /**
         * 搜索图像
         * @returns {Function} 返回一个接受搜索词参数的函数
         */
        searchImages: state => searchTerm => {
            if (!searchTerm) return state.galleryImages
            const lowerTerm = searchTerm.toLowerCase()
            return state.galleryImages.filter(img => img.prompt.toLowerCase().includes(lowerTerm))
        },

        /**
         * 获取当前生成的图像
         * @returns {Array<Object>} 生成的图像数组
         */
        getCurrentGeneratedImages: state => state.generatedImages
    },

    actions: {
        /**
         * 保存图像到图库
         * @param {Object} image - 图像对象
         */
        saveImage(image) {
            // 检查是否已存在
            const exists = this.galleryImages.some(img => img.id === image.id)
            if (!exists) {
                this.galleryImages.unshift(image)

                // 在实际应用中可能会将数据存储到本地存储或后端
                if (process.client) {
                    try {
                        localStorage.setItem('ai-gallery-images', JSON.stringify(this.galleryImages))
                    } catch (error) {
                        console.error('保存图像到本地存储失败:', error)
                    }
                }
            }
        },

        /**
         * 移除图像
         * @param {string} imageId - 图像ID
         */
        removeImage(imageId) {
            this.galleryImages = this.galleryImages.filter(img => img.id !== imageId)

            // 在实际应用中可能会更新本地存储或后端
            if (process.client) {
                try {
                    localStorage.setItem('ai-gallery-images', JSON.stringify(this.galleryImages))
                } catch (error) {
                    console.error('从本地存储删除图像失败:', error)
                }
            }
        },

        /**
         * 设置当前生成的图像
         * @param {Array<Object>} images - 生成的图像数组
         */
        setGeneratedImages(images) {
            this.generatedImages = images
        },

        /**
         * 加载保存的图像（从本地存储）
         */
        loadSavedImages() {
            if (process.client) {
                try {
                    const savedImages = localStorage.getItem('ai-gallery-images')
                    if (savedImages) {
                        this.galleryImages = JSON.parse(savedImages)
                    }
                } catch (error) {
                    console.error('加载本地存储的图像失败:', error)
                }
            }
        }
    }
})
