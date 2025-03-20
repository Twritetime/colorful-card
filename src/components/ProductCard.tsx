import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Chip, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Favorite, FavoriteBorder, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Product } from '../types/product';
import { getImageUrl } from '../services/imageService';

const StyledCard = styled(Card)(({ theme }) => ({
  // Add your styles here
}));

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await getImageUrl(product.imageId);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
        setImageUrl('/placeholder.png');
      }
    };
    loadImage();
  }, [product.imageId]);

  // ... rest of the component code ...

  return (
    <StyledCard onClick={handleCardClick}>
      <ProductImage
        src={imageUrl}
        alt={product.name}
        loading="lazy"
      />
      // ... rest of the JSX ...
    </StyledCard>
  );
};

export default ProductCard; 