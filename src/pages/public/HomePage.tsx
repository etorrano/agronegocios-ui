import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Tractor, BarChart, UserCheck, Truck } from 'lucide-react';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard';
import NewsCard from '../../components/NewsCard';
import { Product, NewsArticle } from '../../types';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - would be replaced by API calls
  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      setFeaturedProducts([
        {
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
          images: ['https://images.pexels.com/photos/6102167/pexels-photo-6102167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'Nuevo',
          origin: 'China',
          transactionType: 'sale',
          status: 'available',
          featured: true,
          createdAt: '2023-10-15T10:30:00Z',
          updatedAt: '2023-10-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Cabezal MacDon FD75',
          brand: 'MacDon',
          model: 'FD75',
          year: 2017,
          price: 64000,
          currency: 'USD',
          description: 'Cabezal e 35 pies MacDon FD75. Carro fabricación nacional, 2 ejes, como nuevo. Único dueño, muy buen estado, poco uso.',
          specifications: {
            ancho: '35 pies',
            ano: 2017,
            origen: 'Canadá',
            ejes: 2
          },
          images: ['https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'Usado - Muy buen estado',
          origin: 'Canadá',
          transactionType: 'consignment',
          status: 'available',
          featured: true,
          createdAt: '2023-11-25T14:45:00Z',
          updatedAt: '2023-11-25T14:45:00Z'
        },
        {
          id: '3',
          name: 'Retroexcavadora Case CE 580N',
          brand: 'Case',
          model: 'CE 580N',
          year: 2019,
          price: 55000,
          currency: 'USD',
          description: 'Retroexcavadora Case CE 580N. Origen Brasil, 5.617 horas. 4x4, Motor FTP 4 cilindros. Cabina cerrada con aire acondicionado.',
          specifications: {
            motor: 'FTP 4 cilindros',
            horas: 5617,
            traccion: '4x4',
            cabina: 'Cerrada con aire acondicionado'
          },
          images: ['https://images.pexels.com/photos/6102396/pexels-photo-6102396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'Usado - Buen estado',
          origin: 'Brasil',
          transactionType: 'trade',
          status: 'available',
          featured: false,
          createdAt: '2023-12-10T09:15:00Z',
          updatedAt: '2023-12-10T09:15:00Z'
        }
      ]);
      
      setLatestNews([
        {
          id: '1',
          title: 'Nueva línea de tractores disponible para el sector agrícola',
          content: 'Texto completo de la noticia...',
          excerpt: 'Presentamos la nueva línea de tractores importados directamente desde Europa, con tecnología de punta y eficiencia comprobada para el trabajo en campo.',
          coverImage: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          author: 'Admin',
          tags: ['Tractores', 'Novedades', 'Importación'],
          createdAt: '2023-12-20T08:30:00Z',
          updatedAt: '2023-12-20T08:30:00Z',
          published: true
        },
        {
          id: '2',
          title: 'Consejos para el mantenimiento de maquinaria agrícola durante el invierno',
          content: 'Texto completo de la noticia...',
          excerpt: 'El mantenimiento adecuado de tu maquinaria agrícola durante los meses de invierno puede extender significativamente su vida útil y evitar costosas reparaciones.',
          coverImage: 'https://images.pexels.com/photos/6101982/pexels-photo-6101982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          author: 'Admin',
          tags: ['Mantenimiento', 'Consejos', 'Invierno'],
          createdAt: '2023-11-15T14:45:00Z',
          updatedAt: '2023-11-15T14:45:00Z',
          published: true
        }
      ]);
      
      setIsLoading(false);
    }, 500);
  }, []);

  const features = [
    {
      icon: <Tractor size={40} className="text-green-600" />,
      title: 'Maquinaria de Calidad',
      description: 'Ofrecemos maquinaria agrícola de primer nivel, tanto nueva como usada, con garantía de calidad y funcionamiento.'
    },
    {
      icon: <BarChart size={40} className="text-green-600" />,
      title: 'Asesoramiento Experto',
      description: 'Nuestro equipo de especialistas te guiará en la selección de la mejor opción según tus necesidades y presupuesto.'
    },
    {
      icon: <UserCheck size={40} className="text-green-600" />,
      title: 'Servicio Personalizado',
      description: 'Te acompañamos durante todo el proceso de compra, venta o intercambio para garantizar tu satisfacción.'
    },
    {
      icon: <Truck size={40} className="text-green-600" />,
      title: 'Logística y Entrega',
      description: 'Coordinamos el transporte y entrega de tu maquinaria a cualquier punto del país de forma segura y eficiente.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Maquinaria agrícola" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Maquinaria agrícola de calidad
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl text-gray-200 mb-8"
          >
            Venta, compra e intermediación de equipos y maquinaria agrícola nueva y usada.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              to="/productos" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
            >
              Ver productos
              <ChevronRight size={20} className="ml-2" />
            </Link>
            <Link 
              to="/contacto" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
            >
              Contacto
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">¿Por qué elegirnos?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              En AgroFierros nos dedicamos a ofrecer las mejores soluciones para el sector agropecuario
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Productos destacados</h2>
            <Link 
              to="/productos" 
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors duration-300"
            >
              Ver todos
              <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 h-96 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded mb-4"></div>
                  <div className="bg-gray-300 h-6 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-300 h-6 rounded w-1/2 mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-10 rounded mt-8"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Necesitas vender tu maquinaria?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Podemos ayudarte a vender tu equipo agrícola o actuar como intermediarios para conseguir el mejor precio.
          </p>
          <Link 
            to="/contacto" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-100 transition-colors duration-300"
          >
            Contáctanos ahora
          </Link>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Últimas noticias</h2>
            <Link 
              to="/noticias" 
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors duration-300"
            >
              Ver todas
              <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 h-96 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded mb-4"></div>
                  <div className="bg-gray-300 h-6 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-1/4 mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-6 rounded w-1/3 mt-4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;