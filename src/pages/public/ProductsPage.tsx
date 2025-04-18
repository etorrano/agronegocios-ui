import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FilterX, Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { Product, TransactionType } from '../../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<TransactionType[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100000 });
  const [showFilters, setShowFilters] = useState(false);
  
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
          status: 'available',
          featured: false,
          createdAt: '2023-08-18T15:40:00Z',
          updatedAt: '2023-08-18T15:40:00Z'
        }
      ];
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      
      // Set price range based on products
      const prices = mockProducts.map(p => p.price);
      setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices)
      });
      
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Apply filters
  useEffect(() => {
    if (products.length === 0) return;
    
    let result = [...products];
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.model.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Transaction types
    if (selectedTypes.length > 0) {
      result = result.filter(product => selectedTypes.includes(product.transactionType));
    }
    
    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Price range
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    setFilteredProducts(result);
  }, [searchQuery, selectedTypes, selectedBrands, priceRange, products]);
  
  // Get unique brands from products
  const availableBrands = [...new Set(products.map(product => product.brand))];
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedBrands([]);
    const prices = products.map(p => p.price);
    setPriceRange({
      min: Math.min(...prices),
      max: Math.max(...prices)
    });
  };
  
  // Toggle transaction type selection
  const toggleTypeSelection = (type: TransactionType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  // Toggle brand selection
  const toggleBrandSelection = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Productos</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Explore nuestra amplia gama de maquinaria agrícola de alta calidad. Ofrecemos equipos nuevos y usados con garantía y asesoramiento especializado.
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
                placeholder="Buscar por marca, modelo o descripción..."
              />
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <Filter size={18} className="mr-2" />
                Filtros
                <ChevronDown size={18} className={`ml-2 transition-transform duration-300 ${showFilters ? 'transform rotate-180' : ''}`} />
              </button>
              
              {(selectedTypes.length > 0 || selectedBrands.length > 0 || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <FilterX size={18} className="mr-2" />
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-md mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Tipo de transacción</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('sale')}
                        onChange={() => toggleTypeSelection('sale')}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-700">Venta directa</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('trade')}
                        onChange={() => toggleTypeSelection('trade')}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-700">Permuta</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes('consignment')}
                        onChange={() => toggleTypeSelection('consignment')}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-700">Consignación</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Marca</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrandSelection(brand)}
                          className="rounded text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Rango de precio (USD)</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Min: ${priceRange.min.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        Max: ${priceRange.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      <input
                        type="range"
                        min={Math.min(...products.map(p => p.price))}
                        max={Math.max(...products.map(p => p.price))}
                        value={priceRange.min}
                        onChange={e => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min={Math.min(...products.map(p => p.price))}
                        max={Math.max(...products.map(p => p.price))}
                        value={priceRange.max}
                        onChange={e => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
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
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No se encontraron productos con los filtros seleccionados.</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <FilterX size={18} className="mr-2" />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;