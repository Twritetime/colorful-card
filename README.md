# Colorful Card - B2B外贸独立站

这是一个为深圳彩卡科技有限公司(Shenzhen Colorful Card Co., Ltd.)开发的B2B外贸独立站，包括完整的前台和后台管理系统。

## 技术栈

- **前端框架**: Next.js 15
- **样式**: TailwindCSS
- **数据库**: Neon PostgreSQL
- **ORM**: Prisma
- **认证**: NextAuth.js
- **部署**: Vercel

## 功能特点

- 响应式设计，适配各种设备
- 多语言支持
- 产品展示和分类
- 询盘系统
- 后台管理系统
  - 产品管理
  - 分类管理
  - 询盘管理
  - 页面内容管理
  - 用户管理

## 本地开发

1. 克隆仓库

```bash
git clone https://github.com/Twritetime/colorful-card.git
cd colorful-card
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

创建一个`.env.local`文件，并添加以下内容：

```
DATABASE_URL="你的Neon数据库URL"
NEXTAUTH_SECRET="你的NextAuth密钥"
NEXTAUTH_URL="http://localhost:3000"
```

4. 运行开发服务器

```bash
npm run dev
```

5. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 部署

该项目配置为使用Vercel进行部署。只需将代码推送到GitHub仓库，然后在Vercel中导入该仓库即可。

确保在Vercel中设置以下环境变量：

- `DATABASE_URL`: Neon数据库连接URL
- `NEXTAUTH_SECRET`: 用于NextAuth.js的密钥
- `NEXTAUTH_URL`: 部署后的网站URL

## 许可证

MIT
