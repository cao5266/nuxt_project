// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  modules: [
    // '@pinia/nuxt', // 暂时注释掉，稍后解决
    '@nuxtjs/tailwindcss',
  ],
  app: {
    head: {
      title: 'AI图像生成器',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '使用人工智能技术生成精美图像的Web应用' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap' }
      ]
    }
  },
  build: {
    transpile: []
  }
})
