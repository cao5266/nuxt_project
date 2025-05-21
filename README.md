# Nuxt项目

一个基于Nuxt.js和Vue 3构建的人工智能图像生成应用。该应用允许用户通过文字描述生成AI图像，并提供图像管理和画廊功能。

## 功能特点

- 通过文字描述生成AI图像
- 支持多种艺术风格（写实、动漫、抽象等）
- 自定义图像尺寸和数量
- 图库管理和图像收藏
- 图像搜索和过滤功能
- 响应式设计，支持移动端和桌面端
- 亮色/暗色主题支持

## 技术栈

- **前端框架**: [Nuxt.js 3](https://nuxt.com/) + [Vue 3](https://vuejs.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **样式**: [TailwindCSS](https://tailwindcss.com/)
- **路由**: Vue Router（Nuxt内置）
- **存储**: 本地存储 (LocalStorage)

## 安装与运行

确保你已安装 [Node.js](https://nodejs.org/) (建议版本 v16+) 和包管理器（npm、yarn 或pnpm）。

### 安装依赖

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### 开发环境运行

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

应用将在 http://localhost:3000 启动。

### 生产环境构建

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build
```

## 项目结构

```
ai-image-generator/
├── assets/            # 静态资源文件
│   └── css/           # CSS文件
├── components/        # 可复用组件
│   ├── BaseButton.vue # 基础按钮组件
│   └── ImageCard.vue  # 图像卡片组件
├── layouts/           # 布局组件
│   └── default.vue    # 默认布局
├── pages/             # 页面组件
│   ├── index.vue      # 首页
│   ├── generator.vue  # 图像生成页
│   └── gallery.vue    # 图库页
├── store/             # Pinia 状态管理
│   └── images.js      # 图像状态管理
├── app.vue            # 应用入口
├── nuxt.config.ts     # Nuxt配置
└── package.json       # 项目依赖
```

## 使用方法

1. **创建图像**:
   - 访问"生成图像"页面
   - 输入详细的文字描述
   - 选择艺术风格、尺寸和图像数量
   - 点击"生成图像"按钮

2. **保存到图库**:
   - 在生成的图像上方悬停
   - 点击"保存"图标将图像添加到个人图库

3. **浏览图库**:
   - 访问"图片库"页面查看保存的所有图像
   - 使用搜索框搜索特定图像
   - 使用风格筛选器筛选不同风格的图像

## 待实现功能

- 接入真实的AI图像生成API（如Stable Diffusion API）
- 用户登录和云端保存功能
- 图像分享和社区功能
- 图像编辑和后期处理功能
- 更多艺术风格和参数选项

## 许可证

MIT
