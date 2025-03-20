import Link from 'next/link';
import ClientImage from './ClientImage';
import { formatCurrency } from '@/lib/utils';

export default function ProductItem({ product }: { product: any }) {
  // 获取产品的主图
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder.png';  // 使用占位图而不是placehold.co

  return (
    <div className="group overflow-hidden rounded-lg border hover:shadow-md transition-shadow">
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <ClientImage
            src={mainImage}
            alt={product.name}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            width={300}
            height={300}
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <p className="mt-1 text-lg font-semibold text-primary">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
} 