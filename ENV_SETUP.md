# 环境变量配置指南

本项目使用 `.env` 文件存储环境变量。由于安全原因，该文件不包含在 Git 仓库中。下面是设置环境变量的步骤：

## 本地开发环境

1. 在项目根目录创建一个 `.env` 文件
2. 添加以下环境变量：

```
# 数据库连接
DATABASE_URL="mongodb+srv://username:password@host/database?retryWrites=true&w=majority"

# NextAuth配置
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google登录（如果使用）
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# 文件上传（如果使用Cloudinary）
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## MongoDB 设置

1. 创建 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 账户
2. 创建一个新的集群
3. 在 "Database Access" 中创建用户
4. 在 "Network Access" 中添加你的 IP 地址
5. 获取连接字符串并更新 `.env` 文件

## Vercel 部署

在 Vercel 上部署时，需要在项目设置中添加以下环境变量：

1. `DATABASE_URL`: MongoDB 连接字符串
2. `NEXTAUTH_SECRET`: NextAuth 密钥
3. `NEXTAUTH_URL`: 你的 Vercel 部署 URL (例如 `https://your-project.vercel.app`)
4. 其他你在本地 `.env` 中使用的变量

## 安全建议

- 不要在代码中硬编码敏感信息
- 不要将 `.env` 文件提交到 Git 仓库
- 定期更改密码和访问密钥
- 只允许特定 IP 地址访问你的数据库 