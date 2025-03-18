import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db/mongodb';

/**
 * 清理产品数据库脚本
 * 执行方式: npm run clean-products
 */

// 产品模型定义
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// 清理数据库
async function cleanProductsDatabase() {
  try {
    console.log('开始连接数据库...');
    await connectToDatabase();
    console.log('数据库连接成功！');

    // 清理选项1: 删除所有产品
    console.log('正在删除所有产品...');
    const deleteResult = await Product.deleteMany({});
    console.log(`已删除 ${deleteResult.deletedCount} 个产品`);

    /* 
    // 清理选项2: 只删除包含 Blob URL 的产品
    console.log('查找包含 Blob URL 的产品...');
    const blobProducts = await Product.find({
      images: { $regex: "^blob:" }
    });
    console.log(`找到 ${blobProducts.length} 个包含 Blob URL 的产品`);
    
    if (blobProducts.length > 0) {
      const deleteResult = await Product.deleteMany({
        images: { $regex: "^blob:" }
      });
      console.log(`已删除 ${deleteResult.deletedCount} 个包含 Blob URL 的产品`);
    }
    */

    console.log('数据库清理完成！');
  } catch (error) {
    console.error('清理数据库时出错:', error);
  } finally {
    // 关闭数据库连接
    await mongoose.disconnect();
    console.log('数据库连接已关闭');
  }
}

// 执行清理
cleanProductsDatabase(); 