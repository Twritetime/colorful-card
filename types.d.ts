import mongoose from 'mongoose';

// 为mongoose添加全局类型
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
} 