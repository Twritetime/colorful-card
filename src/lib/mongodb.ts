import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 在开发环境中使用全局变量来避免热重载时创建多个连接
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then(client => {
        console.log('MongoDB connected successfully');
        return client;
      })
      .catch(error => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 在生产环境中创建新的连接
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(client => {
      console.log('MongoDB connected successfully');
      return client;
    })
    .catch(error => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'colorfulcard';
    console.log(`Using database: ${dbName}`);
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
} 