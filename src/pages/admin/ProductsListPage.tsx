import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Search, 
  Plus,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { Product } from '../../types';

const ProductsListPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Product>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Mock data - would be replaced by API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts: Product[] = [
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
        },
        {
          id: '4',
          name: 'Tractor Case 580N',
          brand: 'Case',
          model: '580N',
          year: 2016,
          price: 48000,
          currency: 'USD',
          description: 'Tractor Case 580N con 3.550 horas de uso. Origen Italia, cabina cerrada con aire acondicionado.',
          specifications: {
            horas: 3550,
            origen: 'Italia',
            cabina: 'Cerrada con aire acondicionado'
          },
          images: ['https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'Usado - Buen estado',
          origin: 'Italia',
          transactionType: 'sale',
          status: 'available',
          featured: false,
          createdAt: '2023-09-05T11:20:00Z',
          updatedAt: '2023-09-05T11:20:00Z'
        },
        {
          id: '5',
          name: 'Minicargadora Case',
          brand: 'Case',
          model: 'SR210',
          year: 2018,
          price: 29500,
          currency: 'USD',
          description: 'Minicargadora Case SR210 con 1.250 horas de uso. Motor diesel, cabina cerrada con aire acondicionado.',
          specifications: {
            horas: 1250,
            motor: 'Diesel',
            cabina: 'Cerrada con aire acondicionado'
          },
          images: ['https://images.pexels.com/photos/8721344/pexels-photo-8721344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'Usado - Muy buen estado',
          origin: 'Estados Unidos',
          transactionType: 'consignment',
          status: 'sold',
          featured: false,
          createdAt: '2023-08-18T15:40:00Z',
          updatedAt: '2023-12-05T09:30:00Z'
        }
      ];
      
      setProducts(mockProducts);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Sort and filter products
  const filteredProducts = [...products]
    .filter(product => 
      searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' 
          ? fieldA - fieldB 
          : fieldB - fieldA;
      }
      
      return 0;
    });
  
  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      // API call to delete product
      console.log('Delete product:', id);
      // Update state
      setProducts(products.filter(product => product.id !== id));
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'reserved':
        return 'Reservado';
      case 'sold':
        return 'Vendido';
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case 'sale':
        return 'Venta directa';
      case 'trade':
        return 'Permuta';
      case 'consignment':
        return 'Consignación';
      default:
        return type;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <button
          onClick={() => navigate('/admin/products/new')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={18} className="inline-block mr-2" />
          Nuevo producto
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Buscar por nombre, marca o modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Cargando productos...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <span className="sr-only">Imagen</span>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Nombre
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Precio
                      {sortField === 'price' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Estado
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('transactionType')}
                  >
                    <div className="flex items-center">
                      Tipo de transacción
                      {sortField === 'transactionType' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('updatedAt')}
                  >
                    <div className="flex items-center">
                      Última actualización
                      {sortField === 'updatedAt' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                            N/A
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.brand} {product.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        USD {product.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTransactionTypeText(product.transactionType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/productos/${product.id}`} 
                          target="_blank"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link 
                          to={`/admin/products/${product.id}`} 
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron productos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsListPage;