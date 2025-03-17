/**
 * 数据库初始化脚本
 * 
 * 使用方法：
 * 1. 确保已设置环境变量MONGODB_URI
 * 2. 运行 npm run seed:products
 */

// 使用CommonJS语法
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// 加载环境变量
dotenv.config({ path: '.env.local' });

// MongoDB连接URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lowkeylove77:weeICuwtKe171ua9@colorful-card.ms17h.mongodb.net/colorfulcard?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error('请在环境变量中设置MONGODB_URI');
}

// 初始产品数据
const initialProducts = [
  {
    name: "高级名片",
    description: "高质量定制设计名片",
    price: 49.99,
    category: "business",
    stock: 100,
    published: true,
    images: ["https://images.unsplash.com/photo-1572502007796-bf53841bc530"],
  },
  {
    name: "豪华礼品卡",
    description: "特殊场合的精美礼品卡",
    price: 29.99,
    category: "gift",
    stock: 200,
    published: true,
    images: ["https://images.unsplash.com/photo-1607344645866-009c320b63e0"],
  },
  {
    name: "企业贺卡",
    description: "用于商务沟通的专业贺卡",
    price: 19.99,
    category: "greeting",
    stock: 150,
    published: true,
    images: ["https://images.unsplash.com/photo-1512909006721-3d6018887383"],
  },
];

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB连接成功');
    return mongoose;
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    process.exit(1);
  }
}

// 定义产品模型
function createProductModel() {
  const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    published: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }, {
    timestamps: true
  });

  return mongoose.models.Product || mongoose.model('Product', ProductSchema);
}

async function seedDatabase() {
  let db;

  try {
    // 连接数据库
    db = await connectToMongoDB();
    
    // 获取产品模型
    const Product = createProductModel();
    
    // 清空现有数据
    await Product.deleteMany({});
    console.log('已清空所有产品数据');
    
    // 插入初始数据
    const products = await Product.insertMany(initialProducts);
    console.log(`成功插入${products.length}个产品数据`);
    
    console.log('数据库初始化成功！');
  } catch (error) {
    console.error('数据库初始化失败:', error);
  } finally {
    // 关闭数据库连接
    if (db) await mongoose.disconnect();
    console.log('数据库连接已关闭');
  }
}

// 执行初始化
seedDatabase(); 