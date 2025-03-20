import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import path from 'path';

const router = express.Router();

// 配置 GridFS 存储
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/colorful-card',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'images',
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

// 上传图片
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '没有上传文件' });
    }
    res.json({ imageId: req.file.id });
  } catch (error) {
    console.error('上传图片错误:', error);
    res.status(500).json({ message: '上传图片失败' });
  }
});

// 获取图片
router.get('/:id', async (req, res) => {
  try {
    const file = await mongoose.connection.db
      .collection('images.files')
      .findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if (!file) {
      return res.status(404).json({ message: '图片不存在' });
    }

    const url = `/api/images/${req.params.id}/view`;
    res.json({ url });
  } catch (error) {
    console.error('获取图片错误:', error);
    res.status(500).json({ message: '获取图片失败' });
  }
});

// 查看图片
router.get('/:id/view', async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'images',
    });

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.id)
    );

    downloadStream.pipe(res);
  } catch (error) {
    console.error('查看图片错误:', error);
    res.status(500).json({ message: '查看图片失败' });
  }
});

export default router; 