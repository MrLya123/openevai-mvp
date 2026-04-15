# OpenEVAI MVP 快速部署指南

## 🚀 本地运行（开发模式）

### 1. 安装依赖（如果还未安装）
```bash
cd openevai-mvp
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入你的 Replicate API Token：
```env
REPLICATE_API_TOKEN=r8_your_token_here
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问：**http://localhost:3000**

---

## 🌐 部署到 Vercel（推荐）

### 方式一：通过 Vercel Dashboard

1. **上传代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/openevai-mvp.git
   git push -u origin main
   ```

2. **在 Vercel 导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - Click "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置环境变量**
   - 在项目设置中找到 "Environment Variables"
   - 添加 `REPLICATE_API_TOKEN`，填入你的 token
   - 点击 "Redeploy" 重新部署

4. **完成！**
   - Vercel 会提供一个 `https://xxx.vercel.app` 的域名
   - 也可以绑定自定义域名

### 方式二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

部署后记得在 Vercel Dashboard 设置环境变量。

---

## 🔧 其他部署选项

### Docker 部署

创建 `Dockerfile`：
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

构建并运行：
```bash
docker build -t openevai-mvp .
docker run -e REPLICATE_API_TOKEN=your_token -p 3000:3000 openevai-mvp
```

### 部署到其他平台

- **Railway**: 直接连接 GitHub，自动检测 Next.js
- **Render**: 使用 Web Service，Build Command: `npm run build`
- **Fly.io**: 使用 `fly launch` 自动配置

---

## ⚙️ 环境变量说明

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `REPLICATE_API_TOKEN` | ✅ | Replicate API 密钥，从 [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens) 获取 |

---

## 📊 性能优化建议

1. **启用 ISR（增量静态再生）**
   - 修改 `src/app/api/generate/route.ts` 添加缓存策略
   
2. **图片优化**
   - 已配置 Next.js Image 组件自动优化
   
3. **API 限流**
   - Replicate 有速率限制，生产环境建议添加队列机制

---

## 🆘 常见问题

### Q: 构建失败，提示 "REPLICATE_API_TOKEN is not defined"
A: 这是正常的，Token 只在运行时使用。确保部署时设置了环境变量。

### Q: 生成图片超时
A: Replicate 首次调用可能需要冷启动，等待 30-60 秒是正常的。

### Q: 图片无法显示
A: 检查 Next.js 配置中的 `remotePatterns` 是否包含 `replicate.delivery`。

### Q: 如何在生产环境调试？
A: 查看 Vercel Functions 日志或对应平台的日志服务。

---

## 📞 支持

如有问题，请查看：
- [Replicate 文档](https://replicate.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 部署指南](https://vercel.com/docs)

---

**OpenEVAI** - 让建筑设计更简单 🦞
