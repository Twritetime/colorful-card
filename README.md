# Colorful Card - 产品展示系统

一个现代化的产品展示系统，使用 Next.js 13+ 构建，支持产品管理、图片上传和多语言。

## 主要功能

- 产品展示和管理
- 图片上传（支持 Vercel Blob Storage）
- 响应式设计
- 多语言支持
- 动态占位图生成

## 技术栈

- Next.js 13+
- TypeScript
- Tailwind CSS
- MongoDB
- Vercel Blob Storage

## 开始使用

1. 克隆仓库：
```bash
git clone https://github.com/Twritetime/colorful-card.git
cd colorful-card
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
创建 `.env.local` 文件并添加必要的环境变量：
```env
MONGODB_URI=你的MongoDB连接URL
BLOB_READ_WRITE_TOKEN=你的Vercel Blob Storage令牌
```

4. 运行开发服务器：
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 部署

本项目可以轻松部署到 Vercel 平台：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Twritetime/colorful-card)

## 许可证

MIT
