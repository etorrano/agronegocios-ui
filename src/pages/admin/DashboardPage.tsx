import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Newspaper, 
  MessageSquare, 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertCircle 
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    pendingMessages: 0,
    publishedNews: 0
  });
  
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - would be replaced by API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalProducts: 18,
        availableProducts: 15,
        pendingMessages: 3,
        publishedNews: 7
      });
      
      setRecentProducts([
        {
          id: '1',
          name: 'Excavadora LiuGong 9035E',
          price: 75000,
          status: 'available',
          date: '2023-10-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Cabezal MacDon FD75',
          price: 64000,
          status: 'available',
          date: '2023-11-25T14:45:00Z'
        },
        {
          id: '3',
          name: 'Retroexcavadora Case CE 580N',
          price: 55000,
          status: 'reserved',
          date: '2023-12-10T09:15:00Z'
        }
      ]);
      
      setRecentMessages([
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@example.com',
          subject: 'Consulta sobre excavadora',
          date: '2023-12-20T14:25:00Z',
          read: false
        },
        {
          id: '2',
          name: 'María García',
          email: 'maria@example.com',
          subject: 'Información sobre financiamiento',
          date: '2023-12-18T09:12:00Z',
          read: false
        },
        {
          id: '3',
          name: 'Carlos Rodríguez',
          email: 'carlos@example.com',
          subject: 'Solicitud de cotización',
          date: '2023-12-15T16:40:00Z',
          read: true
        }
      ]);
      
      setIsLoading(false);
    }, 800);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Productos</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {Math.round((stats.availableProducts / stats.totalProducts) * 100)}% disponibles
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Ventas este mes</h2>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 flex items-center">
              <TrendingDown className="h-4 w-4 mr-1" />
              10% menos que el mes anterior
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Mensajes Pendientes</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingMessages}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Link to="/admin/messages" className="text-blue-600 hover:text-blue-800">
              Ver mensajes →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <Newspaper className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Noticias Publicadas</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.publishedNews}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Link to="/admin/news" className="text-blue-600 hover:text-blue-800">
              Administrar noticias →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Productos recientes</h2>
            <Link to="/admin/products" className="text-sm text-blue-600 hover:text-blue-800">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentProducts.map((product: any) => (
              <div key={product.id} className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Link to={`/admin/products/${product.id}`} className="text-md font-medium text-gray-900 hover:text-blue-600">
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {new Date(product.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900 mr-3">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.status === 'available' ? 'bg-green-100 text-green-800' : 
                      product.status === 'reserved' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'available' ? 'Disponible' : 
                       product.status === 'reserved' ? 'Reservado' : 'Vendido'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Mensajes recientes</h2>
            <Link to="/admin/messages" className="text-sm text-blue-600 hover:text-blue-800">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentMessages.map((message: any) => (
              <div key={message.id} className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-md font-medium text-gray-900">
                        {message.name}
                      </h3>
                      {!message.read && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {message.subject}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(message.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              Hay 3 mensajes sin leer. <Link to="/admin/messages" className="font-medium underline text-green-700 hover:text-green-600">Ver mensajes</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;