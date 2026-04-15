# 🚀 MrLya123 的 OpenEVAI MVP - 一键部署

## 快速部署步骤（2分钟）

### 步骤 1：在 GitHub 创建仓库

1. 访问：https://github.com/new
2. 仓库名：`openevai-mvp`
3. 选择 **Public**
4. 勾选 **"Add a README file"**
5. 点击 **Create repository**

### 步骤 2：上传代码

创建仓库后，在页面上：

1. 点击 **"uploading an existing file"** 链接
2. 将 `openevai-mvp-deploy.zip` 解压
3. 拖拽所有文件到上传区域
4. 点击 **Commit changes**

或者使用命令行（在本地执行）：

```bash
# 克隆您刚创建的仓库
git clone https://github.com/MrLya123/openevai-mvp.git
cd openevai-mvp

# 复制项目文件（从解压后的文件夹）
cp -r /path/to/openevai-mvp/* .

# 提交并推送
git add .
git commit -m "Initial commit"
git push origin main
```

### 步骤 3：部署到 Vercel

1. 访问：https://vercel.com/new
2. 点击 **"Import Git Repository"**
3. 找到 `MrLya123/openevai-mvp`，点击 **Import**
4. Framework Preset 选择 **Next.js**
5. 点击 **Deploy**

等待 1-2 分钟...

### 步骤 4：配置环境变量

部署完成后：

1. 点击 **"Go to Dashboard"**
2. 点击 **Settings** 标签
3. 左侧选择 **Environment Variables**
4. 添加：
   - Name: `REPLICATE_API_TOKEN`
   - Value: `您的 Replicate Token`（从 https://replicate.com/account/api-tokens 获取）
5. 点击 **Save**
6. 返回 **Deployments**，点击 **Redeploy**

### 完成！🎉

您的网站地址：`https://openevai-mvp-xxx.vercel.app`

---

## 备选方案：直接在 Vercel 上传

如果不想用 GitHub：

1. 访问：https://vercel.com/new
2. 选择 **"Upload"** 或拖放文件夹
3. 上传解压后的 `openevai-mvp` 文件夹
4. 配置环境变量
5. 部署

---

## 需要帮助？

如果在任何步骤遇到问题，告诉我具体错误信息，我帮您解决！🦞
