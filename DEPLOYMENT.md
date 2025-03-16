# 深圳彩卡公司B2B外贸独立站部署指南

本文档提供了将项目部署到Vercel的详细步骤。

## 前提条件

1. 一个[GitHub](https://github.com/)账号
2. 一个[Vercel](https://vercel.com/)账号
3. 一个[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)账号（用于数据库）

## 步骤1：准备MongoDB数据库

1. 登录MongoDB Atlas或创建一个新账号
2. 创建一个新的集群（可以使用免费的共享集群）
3. 在"Database Access"中创建一个新的数据库用户，记下用户名和密码
4. 在"Network Access"中添加IP地址`0.0.0.0/0`（允许从任何地方访问）
5. 获取数据库连接字符串，格式如下：
   ```
   mongodb+srv://username:password@cluster.mongodb.net/colorfulcard?retryWrites=true&w=majority
   ```

## 步骤2：将代码推送到GitHub

1. 在GitHub上创建一个新的仓库
2. 将本地代码推送到GitHub仓库：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/colorful-card.git
git push -u origin main
```

## 步骤3：在Vercel上部署

1. 登录[Vercel](https://vercel.com/)
2. 点击"New Project"
3. 导入你的GitHub仓库
4. 配置项目：
   - 框架预设：Next.js
   - 构建命令：`npm run build`（默认）
   - 输出目录：`.next`（默认）
   - 安装命令：`npm install`（默认）

5. 添加环境变量：
   - `DATABASE_URL`：MongoDB连接字符串
   - `NEXTAUTH_SECRET`：一个随机字符串，用于加密会话
   - `NEXTAUTH_URL`：你的网站URL（例如：https://colorful-card.vercel.app）
   - `GOOGLE_CLIENT_ID`：（如果使用Google登录）
   - `GOOGLE_CLIENT_SECRET`：（如果使用Google登录）

6. 点击"Deploy"按钮

## 步骤4：初始化数据库

部署完成后，需要初始化数据库：

1. 在Vercel控制台中，进入你的项目
2. 点击"Deployments"标签
3. 找到最新的部署，点击"Visit"
4. 访问`/api/setup`路径创建管理员账户

## 步骤5：配置自定义域名（可选）

1. 在Vercel控制台中，进入你的项目
2. 点击"Settings"标签，然后点击"Domains"
3. 添加你的自定义域名
4. 按照Vercel提供的说明配置DNS记录

## 步骤6：持续部署

设置完成后，每次你推送代码到GitHub仓库的main分支，Vercel都会自动部署最新版本。

## 故障排除

### 部署失败

1. 检查构建日志，找出错误原因
2. 常见问题：
   - 环境变量缺失或错误
   - 依赖项安装失败
   - 构建命令错误

### 数据库连接问题

1. 确认MongoDB Atlas集群状态
2. 检查数据库用户名和密码
3. 确认IP访问限制设置

### 认证问题

1. 确认`NEXTAUTH_SECRET`和`NEXTAUTH_URL`设置正确
2. 如果使用第三方登录（如Google），确认相关API密钥配置正确

## 性能优化

1. 在Vercel控制台中，使用"Analytics"功能监控网站性能
2. 考虑启用以下功能：
   - Edge Network缓存
   - 图像优化
   - 增量静态再生(ISR)

## 备份策略

1. 定期备份MongoDB数据库
2. 使用MongoDB Atlas的自动备份功能
3. 导出关键数据为JSON文件

## 安全最佳实践

1. 定期更新依赖项
2. 使用环境变量存储敏感信息
3. 启用Vercel的安全标头
4. 配置内容安全策略(CSP)

如有任何部署问题，请联系技术支持团队。 