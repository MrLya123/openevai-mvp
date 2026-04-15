# 🚀 OpenEVAI MVP - 一键部署方案

## 方案一：Vercel 部署（推荐，5分钟搞定）

### 步骤 1：注册 Vercel（30秒）

1. 访问 https://vercel.com/signup
2. 点击 "Continue with GitHub"（用 GitHub 账号登录）
3. 如果没有 GitHub 账号，先注册 GitHub：https://github.com/signup
4. 授权 Vercel 访问您的 GitHub

### 步骤 2：创建 GitHub 仓库（1分钟）

1. 访问 https://github.com/new
2. 仓库名填写：`openevai-mvp`
3. 选择 "Public"（公开）
4. 不要勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 步骤 3：推送代码到 GitHub（1分钟）

在项目目录执行：

```bash
cd /home/gem/workspace/agent/workspace/openevai-mvp
git remote add origin https://github.com/YOUR_USERNAME/openevai-mvp.git
git branch -M main
git push -u origin main
```

（将 YOUR_USERNAME 替换为您的 GitHub 用户名）

### 步骤 4：一键部署到 Vercel（2分钟）

1. 访问 https://vercel.com/new
2. 找到您的 `openevai-mvp` 仓库，点击 "Import"
3. Project Name 保持默认
4. Framework Preset 选择 "Next.js"
5. 点击 "Deploy"

等待 1-2 分钟，部署完成！

### 步骤 5：配置环境变量（1分钟）

1. 部署完成后，点击 "Go to Dashboard"
2. 点击顶部的 "Settings" 标签
3. 左侧选择 "Environment Variables"
4. 添加变量：
   - Name: `REPLICATE_API_TOKEN`
   - Value: `您的 Replicate API Token`
5. 点击 "Save"
6. 返回 "Deployments" 标签，点击 "Redeploy"

### 完成！🎉

您的网站地址：`https://openevai-mvp-xxx.vercel.app`

---

## 方案二：Netlify 部署（备选）

如果 Vercel 访问慢，可以用 Netlify：

1. 访问 https://app.netlify.com/drop
2. 直接拖拽项目文件夹上传
3. 在 Site settings → Environment variables 中添加 `REPLICATE_API_TOKEN`
4. 重新部署

---

## 方案三：Railway 部署（国内访问快）

Railway 在国内访问速度较好：

1. 访问 https://railway.app
2. 用 GitHub 登录
3. New Project → Deploy from GitHub repo
4. 选择您的仓库
5. 在 Variables 中添加 `REPLICATE_API_TOKEN`
6. 部署

---

## 🔧 获取 Replicate API Token

1. 访问 https://replicate.com
2. 用 GitHub 账号登录
3. 进入 https://replicate.com/account/api-tokens
4. 点击 "Create a new token"
5. 复制 token（格式：r8_xxxxxxxxxxxxxxxx）

**注意：**
- 新用户有免费试用额度
- 按量付费：约 $0.03-0.05/张图片
- 建议先充值 $10-20 测试

---

## 💡 没有信用卡怎么办？

如果您没有信用卡注册 Replicate：

### 选项 1：使用演示模式
- 当前项目已配置演示模式
- 可以展示 UI 界面和所有功能
- 只是不能真实生成图片

### 选项 2：使用开源替代方案
- 自建 Stable Diffusion（需要 GPU）
- 使用 Hugging Face 免费 API（有限额）
- 使用其他免费的 AI 图片 API

### 选项 3：仅展示 UI
- 部署前端界面
- 展示完整的交互流程
- 适合演示和测试

---

## 📱 部署成功后的链接

部署完成后，您将获得类似这样的链接：

```
https://openevai-mvp.vercel.app
https://openevai-mvp.netlify.app
https://openevai-mvp.up.railway.app
```

可以：
- 在电脑、手机、平板上访问
- 分享给朋友、客户、投资人
- 绑定自定义域名（如 `ai.yourcompany.com`）

---

## 🆘 遇到问题？

### 部署失败
- 检查 package.json 是否正确
- 确保 Node.js 版本 >= 18
- 查看 Vercel 的 Build Logs

### 页面空白
- 检查环境变量是否配置正确
- 查看浏览器控制台错误

### 生成图片失败
- 检查 REPLICATE_API_TOKEN 是否正确
- 检查账户是否有足够额度
- 查看 Vercel Functions Logs

---

## 🎉 完成清单

部署完成后，您可以：

- [ ] 访问网站确认页面加载
- [ ] 测试文生图功能
- [ ] 测试图生图功能
- [ ] 测试历史记录功能
- [ ] 在手机上访问测试响应式
- [ ] 分享给他人使用

---

**需要帮助？** 随时告诉我！🦞
