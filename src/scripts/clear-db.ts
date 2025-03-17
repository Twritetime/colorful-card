/**
 * 清空数据库脚本
 * 
 * 使用方法：
 * 1. 确保已设置环境变量MONGODB_URI
 * 2. 运行 npm run clear-db
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config({ path: '.env.local' });

// MongoDB连接URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lowkeylove77:weeICuwtKe171ua9@colorful-card.ms17h.mongodb.net/colorfulcard?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error('请在环境变量中设置MONGODB_URI');
}

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

async function clearDatabase() {
  let db;

  try {
    // 连接数据库
    db = await connectToMongoDB();
    
    // 获取模型
    const Product = createProductModel();
    const Category = createCategoryModel();
    
    // 清空所有产品数据
    const productResult = await Product.deleteMany({});
    console.log(`已删除${productResult.deletedCount}个产品数据`);
    
    // 清空所有类别数据
    const categoryResult = await Category.deleteMany({});
    console.log(`已删除${categoryResult.deletedCount}个类别数据`);
    
    console.log('数据库清空成功！');
  } catch (error) {
    console.error('清空数据库失败:', error);
  } finally {
    // 关闭数据库连接
    if (db) await mongoose.disconnect();
    console.log('数据库连接已关闭');
  }
}

// 执行清空操作
clearDatabase(); 