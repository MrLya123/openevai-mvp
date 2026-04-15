# 🚀 Vercel 一键部署指南

## 方法一：使用 Vercel Deploy Button（推荐）

### 步骤 1：准备 GitHub 仓库

由于项目已经在本地创建，您需要将其推送到 GitHub：

```bash
# 1. 在 GitHub 创建新仓库（不要初始化）
# 访问: https://github.com/new
# 仓库名: openevai-mvp

# 2. 添加远程仓库并推送
cd /home/gem/workspace/agent/workspace/openevai-mvp
git remote add origin https://github.com/YOUR_USERNAME/openevai-mvp.git
git branch -M main
git push -u origin main
```

### 步骤 2：一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/openevai-mvp&env=REPLICATE_API_TOKEN&envDescription=Replicate%20API%20Token%20for%20AI%20image%20generation&envLink=https://replicate.com/account/api-tokens&project-name=openevai-mvp&repository-name=openevai-mvp)

点击上方按钮，按提示完成部署。

---

## 方法二：使用 Vercel CLI

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2：登录 Vercel

```bash
vercel login
```

### 步骤 3：部署

```bash
cd /home/gem/workspace/agent/workspace/openevai-mvp
vercel --prod
```

### 步骤 4：配置环境变量

部署完成后，在 Vercel Dashboard 中添加环境变量：
- `REPLICATE_API_TOKEN`: your_token_here

---

## 方法三：手动部署（无需命令行）

### 步骤 1：下载项目

将项目文件夹压缩为 zip：
```bash
cd /home/gem/workspace/agent/workspace
zip -r openevai-mvp.zip openevai-mvp/
```

### 步骤 2：在 Vercel 上传

1. 访问 https://vercel.com/new
2. 选择 "Import Git Repository" 或 "Upload"（如果支持）
3. 按照向导完成部署

---

## 🔧 环境变量配置

部署完成后，必须在 Vercel Dashboard 中配置环境变量：

| 变量名 | 值 | 说明 |
|-------|-----|------|
| REPLICATE_API_TOKEN | r8_xxxxxxxxxxxx | Replicate API 密钥 |

获取 Token: https://replicate.com/account/api-tokens

---

## 📋 部署后检查清单

- [ ] 项目成功部署到 Vercel
- [ ] 环境变量 REPLICATE_API_TOKEN 已配置
- [ ] 访问网站确认页面加载正常
- [ ] 测试文生图功能
- [ ] 测试图生图功能

---

## 🐛 常见问题

### Q: 部署失败，提示 "Build Failed"
A: 检查 package.json 中的依赖是否正确安装，尝试本地运行 `npm run build` 看是否有错误。

### Q: 页面显示 "404: This page could not be found"
A: 检查 next.config.js 配置，确保路由正确。

### Q: 生成图片时提示 "API Error"
A: 检查环境变量 REPLICATE_API_TOKEN 是否正确配置，以及账户是否有足够额度。

### Q: 如何更新已部署的项目？
A: 修改代码后重新推送到 GitHub，Vercel 会自动重新部署。

---

## 🎉 部署成功后的链接格式

```
https://openevai-mvp-xxx.vercel.app
```

其中 `xxx` 是随机生成的字符串。

您也可以在 Vercel Dashboard 中设置自定义域名。

---

## 📞 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Replicate 文档: https://replicate.com/docs
- Next.js 部署指南: https://nextjs.org/docs/deployment
