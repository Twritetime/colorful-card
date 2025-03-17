import mongoose, { Schema, Document } from 'mongoose';

// 类别文档接口
export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  parentId?: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// 类别Schema定义
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: false, default: '' },
  icon: { type: String },
  image: { type: String },
  parentId: { type: String, default: null },
  order: { type: Number, default: 0 },
  // 自动设置创建和更新时间
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  // 在保存时自动更新updatedAt字段
  timestamps: true
});

// 根据环境初始化模型
// 这样写是为了防止在Next.js开发模式下的热重载引起的模型重复定义错误
const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default CategoryModel; 