import mongoose, { Schema, Document } from 'mongoose';

// 产品文档接口
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  published: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 产品Schema定义
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  published: { type: Boolean, default: false },
  images: { type: [String], default: [] },
  // 自动设置创建和更新时间
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  // 在保存时自动更新updatedAt字段
  timestamps: true
});

// 根据环境初始化模型
// 这样写是为了防止在Next.js开发模式下的热重载引起的模型重复定义错误
const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel; 