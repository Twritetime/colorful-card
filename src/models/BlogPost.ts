import mongoose, { Schema, Document } from 'mongoose';

// 博客文章文档接口
export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  coverImage: string;
  tags: string[];
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// 博客文章Schema定义
const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  coverImage: { type: String },
  tags: { type: [String], default: [] },
  publishedAt: { type: Date, default: null },
  // 自动设置创建和更新时间
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  // 在保存时自动更新updatedAt字段
  timestamps: true
});

// 添加索引以提高查询性能
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1 });

// 根据环境初始化模型
// 这样写是为了防止在Next.js开发模式下的热重载引起的模型重复定义错误
const BlogPostModel = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPostModel; 