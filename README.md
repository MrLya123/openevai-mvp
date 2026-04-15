# OpenEVAI MVP - 建筑/室内设计 AI 生成工具

一个基于 Next.js 和 Replicate API 的快速原型，用于生成建筑和室内设计效果图。

## ✨ 功能特性

- **文生图**：输入文字描述，一键生成建筑或室内设计效果图
- **图生图**：上传草图或白模，AI 自动渲染成精美效果图
- **风格选择**：预设多种建筑和室内风格（现代中式、极简、新古典等）
- **历史记录**：本地存储最近生成的图片

## 🚀 快速开始

### 1. 环境准备

确保已安装 Node.js 18+ 和 npm/yarn。

### 2. 获取 Replicate API Token

1. 访问 [Replicate](https://replicate.com/)
2. 注册/登录账号
3. 进入 [API Tokens](https://replicate.com/account/api-tokens)
4. 复制你的 API Token

### 3. 安装依赖

```bash
cd openevai-mvp
npm install
```

### 4. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Replicate API Token：

```env
REPLICATE_API_TOKEN=r8_your_actual_token_here
```

### 5. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📦 项目结构

```
openevai-mvp/
├── src/
│   ├── app/
│   │   ├── api/generate/route.ts    # API 路由（调用 Replicate）
│   │   ├── txt2img/page.tsx         # 文生图页面
│   │   ├── img2img/page.tsx         # 图生图页面
│   │   ├── history/page.tsx         # 历史记录页面
│   │   ├── layout.tsx               # 根布局
│   │   ├── page.tsx                 # 首页
│   │   └── globals.css              # 全局样式
│   └── components/                  # React 组件
├── public/                          # 静态资源
├── .env.example                     # 环境变量示例
├── next.config.js                   # Next.js 配置
├── tailwind.config.js               # Tailwind CSS 配置
├── package.json                     # 项目依赖
└── README.md                        # 本文档
```

## 🎨 技术栈

- **前端**：Next.js 14 + TypeScript + Tailwind CSS
- **AI 后端**：Replicate API
  - `stability-ai/sdxl` - 基础文生图模型
  - `thibaud/controlnet-sdxl` - 图生图模型（保留结构）
- **部署**：Vercel（推荐）或任意 Node.js 服务器

## 🌐 部署到 Vercel

### 方式一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/openevai-mvp&env=REPLICATE_API_TOKEN)

### 方式二：手动部署

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 部署项目：
   ```bash
   vercel
   ```

3. 设置环境变量：
   - 进入 Vercel Dashboard
   - 选择你的项目
   - Settings → Environment Variables
   - 添加 `REPLICATE_API_TOKEN`

4. 重新部署以应用环境变量

## 📝 使用指南

### 文生图

1. 选择类型：建筑设计 或 室内设计
2. 选择风格（可选）：从预设风格中选择
3. 输入描述：尽可能详细地描述你想要的效果
4. 点击"开始生成"，等待 10-30 秒
5. 下载或重新生成

**提示词示例：**
- "高端现代中式风格的独栋别墅建筑，深灰色大理石外立面，黄昏时分，8K 超高清"
- "北欧风格客厅，大面积落地窗，浅色木地板，绿植点缀，温馨舒适"

### 图生图

1. 上传草图或白模图片（支持拖拽）
2. 选择渲染风格（可选）
3. 补充描述（可选）
4. 点击"开始渲染"
5. 对比原图和生成结果

**适用场景：**
- 手绘草图 → 效果图
- 白模渲染 → 材质贴图
- 概念设计 → 视觉呈现

## ⚠️ 注意事项

1. **API 费用**：Replicate 按使用量计费，请留意账户余额
2. **生成时间**：每次生成约需 10-30 秒，取决于队列长度
3. **图片大小**：上传的图片不超过 10MB
4. **本地存储**：历史记录仅保存在浏览器本地，清除缓存会丢失

## 🛠️ 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 📄 License

MIT License - 仅供学习和原型演示使用

## 🙏 致谢

- [Replicate](https://replicate.com/) - AI 模型平台
- [Stability AI](https://stability.ai/) - SDXL 模型
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

---

**OpenEVAI** - 让建筑设计更简单 🦞
