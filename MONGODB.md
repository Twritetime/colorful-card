# MongoDB 数据库配置指南

本文档提供了如何配置和连接 MongoDB Atlas 数据库的步骤。

## 连接步骤

1. **创建 MongoDB Atlas 账户**
   - 访问 [MongoDB Atlas](https://cloud.mongodb.com/) 并注册/登录账户
   - 创建一个新项目（如果需要）

2. **创建数据库集群**
   - 在项目内创建一个新的集群
   - 选择免费的共享集群（Shared Cluster）即可满足开发需求

3. **设置数据库访问**
   - 创建数据库用户（已创建：`lowkeylove77`）
   - 记住生成的密码（请妥善保管）

4. **配置网络访问**
   - 为了开发目的，您可以临时允许从任何位置访问
   - 对于生产环境，应该只允许特定的 IP 地址访问

5. **获取连接字符串**
   - 格式: `mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority`
   - 在项目的 `.env` 文件中设置 `DATABASE_URL` 变量

## 数据库初始化

在首次连接后，您需要初始化数据库结构：

```bash
npx prisma db push
```

这将根据 `prisma/schema.prisma` 文件中定义的模型创建必要的集合。

## 环境变量设置

确保以下环境变量已正确设置：

```
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
```

**注意：** 请勿将包含实际密码的 `.env` 文件提交到版本控制系统。

## 本地开发与部署

- 本地开发：使用 `.env` 文件存储环境变量
- 部署到 Vercel：在 Vercel 的项目设置中添加相同的环境变量 