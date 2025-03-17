/**
 * 类别数据初始化脚本
 * 
 * 使用方法：
 * 1. 确保已设置环境变量MONGODB_URI
 * 2. 运行 npx ts-node src/scripts/seed-categories.ts
 */

import mongoose from 'mongoose';
import { connectToDatabase } from '../lib/db/mongodb';
import Category from '../models/Category';

// 初始类别数据
const initialCategories = [
  {
    name: "名片",
    slug: "business-cards",
    description: "专业商务名片，多种材质和工艺可选",
    icon: "BusinessCard",
    image: "https://images.unsplash.com/photo-1572502007796-bf53841bc530",
    parentId: null,
    order: 1,
  },
  {
    name: "贺卡",
    slug: "greeting-cards",
    description: "各种场合的精美贺卡",
    icon: "Gift",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0",
    parentId: null,
    order: 2,
  },
  {
    name: "礼品卡",
    slug: "gift-cards",
    description: "高端礼品卡和礼券",
    icon: "GiftCard",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383",
    parentId: null,
    order: 3,
  },
  {
    name: "邀请卡",
    slug: "invitation-cards",
    description: "婚礼、派对和活动邀请卡",
    icon: "Calendar",
    image: "https://images.unsplash.com/photo-1607450852568-b2e1e6fa0ece",
    parentId: null,
    order: 4,
  }
];

async function seedCategories() {
  try {
    // 连接数据库
    await connectToDatabase();
    console.log('数据库连接成功');
    
    // 清空现有数据
    await Category.deleteMany({});
    console.log('已清空所有类别数据');
    
    // 插入初始数据
    const categories = await Category.insertMany(initialCategories);
    console.log(`成功插入${categories.length}个类别数据`);
    
    console.log('类别数据初始化成功！');
  } catch (error) {
    console.error('类别数据初始化失败:', error);
  } finally {
    // 关闭数据库连接
    await mongoose.disconnect();
    console.log('数据库连接已关闭');
  }
}

// 执行初始化
seedCategories(); 