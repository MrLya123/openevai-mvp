#!/bin/bash

echo "🚀 OpenEVAI MVP - Vercel 部署脚本"
echo "=================================="
echo ""

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "⚠️  部署前准备："
echo "   1. 确保已注册 Vercel 账号: https://vercel.com/signup"
echo "   2. 确保已绑定 GitHub 账号"
echo "   3. 准备好 REPLICATE_API_TOKEN"
echo ""

# 检查是否在 Git 仓库
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是 Git 仓库"
    exit 1
fi

echo "🔧 步骤 1: 登录 Vercel"
echo "   将打开浏览器进行认证..."
vercel login

echo ""
echo "🔧 步骤 2: 部署项目"
echo "   按照提示完成部署..."
vercel --prod

echo ""
echo "🔧 步骤 3: 配置环境变量"
echo "   部署完成后，请在 Vercel Dashboard 中设置环境变量:"
echo "   REPLICATE_API_TOKEN=your_token_here"
echo ""

echo "✅ 部署完成！"
echo "   访问 Vercel Dashboard 查看项目: https://vercel.com/dashboard"
echo ""