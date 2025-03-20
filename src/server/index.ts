import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接 MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/colorful-card', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB 连接成功'))
.catch((err) => console.error('MongoDB 连接失败:', err));

// 路由
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
}); 