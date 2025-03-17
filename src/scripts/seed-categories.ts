/**
 * 类别数据初始化脚本
 * 
 * 使用方法：
 * 1. 确保已设置环境变量MONGODB_URI
 * 2. 运行 npm run seed:categories
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

// 定义类别模型
function createCategoryModel() {
  const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String },
    image: { type: String },
    parentId: { type: String, default: null },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }, {
    timestamps: true
  });

  return mongoose.models.Category || mongoose.model('Category', CategorySchema);
}

async function seedCategories() {
  let db;

  try {
    // 连接数据库
    db = await connectToMongoDB();
    
    // 获取类别模型
    const Category = createCategoryModel();
    
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
    if (db) await mongoose.disconnect();
    console.log('数据库连接已关闭');
  }
}

// 执行初始化
seedCategories(); 