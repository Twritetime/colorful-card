import mongoose from 'mongoose';

// MongoDB连接URL
// 注意：在生产环境中，应该使用环境变量存储数据库连接字符串
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lowkeylove77:<db_password>@colorful-card.ms17h.mongodb.net/?retryWrites=true&w=majority&appName=colorful-card';

if (!MONGODB_URI) {
  throw new Error('请在环境变量中定义 MONGODB_URI');
}

// 声明一个全局变量mongoose用于保持连接实例
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * 连接到MongoDB数据库
 * @returns 返回mongoose连接实例
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
} 