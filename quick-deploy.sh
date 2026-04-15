#!/bin/bash

echo "🚀 OpenEVAI MVP - 快速部署到 Vercel"
echo "===================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}步骤 1/4: 检查 Vercel CLI${NC}"
if ! command -v vercel &> /dev/null; then
    echo "正在安装 Vercel CLI..."
    npm install -g vercel
fi
echo -e "${GREEN}✓ Vercel CLI 已就绪${NC}"
echo ""

echo -e "${YELLOW}步骤 2/4: 登录 Vercel${NC}"
echo "这将打开浏览器让您登录 Vercel"
echo "如果您没有账号，可以用 GitHub/GitLab/Bitbucket 账号一键登录"
echo ""
read -p "按 Enter 继续..."
vercel login
echo ""

echo -e "${YELLOW}步骤 3/4: 部署项目${NC}"
echo "正在部署到 Vercel..."
echo ""

# 执行部署
vercel --prod --yes

echo ""
echo -e "${YELLOW}步骤 4/4: 配置环境变量${NC}"
echo ""
echo "⚠️  重要：部署完成后，请完成以下步骤："
echo ""
echo "1. 访问 Vercel Dashboard:"
echo "   https://vercel.com/dashboard"
echo ""
echo "2. 找到您的项目，点击进入"
echo ""
echo "3. 进入 Settings → Environment Variables"
echo ""
echo "4. 添加以下环境变量："
echo "   名称: REPLICATE_API_TOKEN"
echo "   值:   您的 Replicate API Token"
echo ""
echo "   获取 Token: https://replicate.com/account/api-tokens"
echo ""
echo "5. 点击 Save，然后重新部署"
echo ""

echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "您的网站将在几分钟内上线"
echo "访问 Vercel Dashboard 查看部署状态"
echo ""

read -p "按 Enter 退出..."