import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// 测试环境变量是否正确加载
console.log('API Base URL:', API_BASE_URL);

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageId;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getImageUrl = async (imageId: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/${imageId}`);
    return response.data.url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
}; 