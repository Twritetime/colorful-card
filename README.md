# Colorful Card - B2B外贸独立站

这是一个基于Next.js开发的B2B外贸独立站，为深圳彩卡公司（Shenzhen Colorful Card Co., Ltd.）提供专业的卡片和礼品解决方案展示和销售平台。

## 功能特点

- 响应式设计，适配各种设备
- 暗色/亮色主题切换
- 多语言支持
- 产品展示与分类
- 在线询价系统
- 管理后台
  - 产品管理（增删改查）
  - 订单管理
  - 客户管理
  - 询盘管理

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS, DaisyUI
- **状态管理**: React Hooks
- **表单处理**: React Hook Form
- **认证**: NextAuth.js
- **数据库**: MongoDB (Prisma ORM)
- **部署**: Vercel

## 本地开发

### 前提条件

- Node.js 18.0.0 或更高版本
- npm 或 yarn
- MongoDB 数据库

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/colorful-card.git
cd colorful-card
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 配置环境变量

复制 `.env.example` 文件为 `.env.local` 并填写必要的环境变量：

```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/colorfulcard"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. 初始化数据库

```bash
npx prisma db push
```

5. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

现在，你可以在浏览器中访问 `http://localhost:3000` 查看网站。

## 部署到Vercel

1. 在Vercel上创建一个新项目
2. 导入你的GitHub仓库
3. 配置环境变量
4. 点击部署

## 管理后台使用

管理后台位于 `/dashboard` 路径。首次使用时，你需要创建一个管理员账户：

1. 访问 `/api/setup` 路径（仅在首次设置时可用）
2. 使用创建的管理员账户登录 `/login`
3. 登录后即可访问管理后台

## 项目结构

```
colorful-card/
├── prisma/              # Prisma数据库模型
├── public/              # 静态资源
├── src/
│   ├── app/             # Next.js应用路由
│   │   ├── api/         # API路由
│   │   ├── dashboard/   # 管理后台页面
│   │   └── ...          # 其他页面
│   ├── components/      # React组件
│   │   ├── dashboard/   # 管理后台组件
│   │   └── layout/      # 布局组件
│   ├── lib/             # 工具函数
│   └── types/           # TypeScript类型定义
├── .env                 # 环境变量
├── next.config.js       # Next.js配置
└── tailwind.config.ts   # Tailwind CSS配置
```

## 许可证

[MIT](LICENSE)

## 联系方式

如有任何问题或建议，请联系：

- 邮箱: contact@example.com
- 网站: https://colorfulcard.com
