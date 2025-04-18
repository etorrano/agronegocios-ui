import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, DollarSign, MapPin, Calendar, Info, Phone, Mail } from 'lucide-react';
import ContactForm from '../../components/ContactForm';
import { Product } from '../../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProduct: Product = {
        id: '1',
        name: 'Excavadora LiuGong 9035E',
        brand: 'LiuGong',
        model: '9035E',
        year: 2021,
        price: 75000,
        currency: 'USD',
        description: 'Excavadora LiuGong 9035E con motor Yanmar 3TNV88-BPLY de 21,2 kW (29 hp) a 2400 rpm. Capacidad del cucharón estándar 0,11 m3.',
        specifications: {
          motor: 'Yanmar 3TNV88-BPLY',
          potencia: '21,2 kW (29 hp) a 2400 rpm',
          profundidad: '3085 mm',
          capacidad: '0,11 m3',
          peso: '3980 kg'
        },
        images: [
          'https://images.pexels.com/photos/6102167/pexels-photo-6102167.jpeg',
          'https://images.pexels.com/photos/6102396/pexels-photo-6102396.jpeg',
          'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg'
        ],
        condition: 'Nuevo',
        origin: 'China',
        transactionType: 'sale',
        status: 'available',
        featured: true,
        createdAt: '2023-10-15T10:30:00Z',
        updatedAt: '2023-10-15T10:30:00Z'
      };

      setProduct(mockProduct);
      setSelectedImage(mockProduct.images[0]);
      setIsLoading(false);
    }, 800);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
          <p className="mt-2 text-gray-600">El producto que busca no existe o ha sido removido.</p>
          <Link
            to="/productos"
            className="mt-4 inline-flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <ChevronLeft size={20} className="mr-1" />
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/productos"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <ChevronLeft size={20} className="mr-1" />
            Volver a productos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === image
                      ? 'border-emerald-500'
                      : 'border-transparent hover:border-emerald-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Vista ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.brand} {product.model}
                  </h1>
                  <p className="text-lg text-gray-600">{product.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    USD {product.price.toLocaleString()}
                  </div>
                  {product.transactionType === 'consignment' && (
                    <span className="text-sm text-gray-500">+ IVA</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar size={20} className="mr-2 text-emerald-500" />
                  <span>Año: {product.year}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-2 text-emerald-500" />
                  <span>Origen: {product.origin}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Info size={20} className="mr-2 text-emerald-500" />
                  <span>Estado: {product.condition}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="border-t border-gray-200 py-6">
                <h2 className="text-xl font-semibold mb-4">Especificaciones</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <span className="font-medium text-gray-700 capitalize">{key}:</span>
                      <span className="ml-2 text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/59899436421"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    <Phone size={20} className="mr-2" />
                    Llamar
                  </a>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
                  >
                    <Mail size={20} className="mr-2" />
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-600 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Consultar sobre este producto</h2>
              </div>
              <div className="p-6">
                <ContactForm productId={product.id} productName={product.name} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;