/**
 * 数据库初始化脚本
 * 
 * 使用方法：
 * 1. 确保已设置环境变量MONGODB_URI
 * 2. 运行 npx ts-node src/scripts/seed-db.ts
 */

import mongoose from 'mongoose';
import { connectToDatabase } from '../lib/db/mongodb';
import Product from '../models/Product';

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

async function seedDatabase() {
  try {
    // 连接数据库
    await connectToDatabase();
    console.log('数据库连接成功');
    
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
    await mongoose.disconnect();
    console.log('数据库连接已关闭');
  }
}

// 执行初始化
seedDatabase(); 