import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderForm from './OrderForm';
import SimpleImage from './SimpleImage';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  features: string[];
  is_active: boolean;
  rating?: number;
  reviews?: any[];
}

interface OrderData {
  productId: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onLearnMore: (product: Product) => void;
  onOrder: (orderData: OrderData) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onLearnMore, onOrder }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const isInStock = product.stock > 0;
  const price = product.price;

  return (
    <>
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Images */}
      <div className="relative h-80 bg-gray-50 overflow-hidden">
        {product.is_active && (
          <motion.div
            className="absolute top-4 left-4 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Available
            </span>
          </motion.div>
        )}

        {/* Main Image */}
        <SimpleImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-8"
          width={400}
          height={320}
          priority={false}
        />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews?.length || 0})</span>
            </div>
          )}
      </div>
      
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Features */}
        <div className="mb-4">
          <ul className="text-sm text-gray-600 space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
      </div>
      
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-gray-900">€{price}</div>
          <div className="text-sm text-gray-500">
          {isInStock ? 'En stock' : 'Agotado'}
        </div>
      </div>
      
        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            onClick={() => setIsOrderFormOpen(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!isInStock}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isInStock ? 'Ordenar' : 'Agotado'}
          </motion.button>
          
          <motion.button
            onClick={() => onLearnMore(product)}
            className="w-full text-blue-600 text-sm font-medium hover:underline"
            whileHover={{ x: 5 }}
          >
            Más información &gt;
          </motion.button>
        </div>
    </div>
    </motion.div>

    {/* Order Form Modal */}
    <OrderForm
      product={product}
      isOpen={isOrderFormOpen}
      onClose={() => setIsOrderFormOpen(false)}
      onSubmit={onOrder}
    />
    </>
  );
};

export default ProductCard;
