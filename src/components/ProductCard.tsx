import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Repeat, DollarSign } from 'lucide-react';
import { Product } from '../types';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <DollarSign size={18} className="mr-1" />;
      case 'trade':
        return <Repeat size={18} className="mr-1" />;
      case 'consignment':
        return <ExternalLink size={18} className="mr-1" />;
      default:
        return <DollarSign size={18} className="mr-1" />;
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return 'Venta Directa';
      case 'trade':
        return 'Permuta';
      case 'consignment':
        return 'Consignación';
      default:
        return 'Venta';
    }
  };

  const getTransactionTypeClass = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-emerald-100 text-emerald-800';
      case 'trade':
        return 'bg-amber-100 text-amber-800';
      case 'consignment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x300?text=No+Imagen'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.featured && (
          <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-sm font-semibold rounded-bl">
            Destacado
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {product.brand} {product.model}
          </h3>
          <span className="font-bold text-emerald-600">
            USD {product.price.toLocaleString()}
            {product.transactionType === 'consignment' && ' + IVA'}
          </span>
        </div>
        
        <div className="flex items-center mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTransactionTypeClass(product.transactionType)}`}>
            {getTransactionTypeIcon(product.transactionType)}
            {getTransactionTypeLabel(product.transactionType)}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p className="line-clamp-2">{product.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
          {product.year && (
            <div>
              <span className="font-semibold">Año:</span> {product.year}
            </div>
          )}
          {product.origin && (
            <div>
              <span className="font-semibold">Origen:</span> {product.origin}
            </div>
          )}
          <div>
            <span className="font-semibold">Estado:</span> {product.condition}
          </div>
        </div>
        
        <div className="mt-auto">
          <Link
            to={`/productos/${product.id}`}
            className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-300 shadow-sm hover:shadow"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;