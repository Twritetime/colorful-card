import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db/mongodb';

/**
 * 清理包含Blob URL的产品数据脚本
 * 执行方式: npm run clean-blob-products
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

// 清理数据库中包含Blob URL的产品
async function cleanBlobProducts() {
  try {
    console.log('开始连接数据库...');
    await connectToDatabase();
    console.log('数据库连接成功！');

    // 获取所有产品
    const allProducts = await Product.find({});
    console.log(`数据库中共有 ${allProducts.length} 个产品`);

    // 筛选包含Blob URL的产品
    const blobProducts = allProducts.filter(product => 
      product.images && product.images.some(url => url && url.startsWith('blob:'))
    );

    console.log(`找到 ${blobProducts.length} 个包含Blob URL的产品`);

    if (blobProducts.length > 0) {
      // 删除包含Blob URL的产品
      const productIds = blobProducts.map(p => p._id);
      const deleteResult = await Product.deleteMany({ _id: { $in: productIds } });
      console.log(`已删除 ${deleteResult.deletedCount} 个包含Blob URL的产品`);
      
      // 输出被删除的产品信息
      console.log('被删除的产品列表:');
      blobProducts.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name} (ID: ${p._id})`);
        console.log(`   图片URLs: ${p.images.join(', ')}`);
      });
    } else {
      console.log('没有找到包含Blob URL的产品');
    }

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
cleanBlobProducts(); 