import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, Trash2, Plus, X, ImagePlus } from 'lucide-react';
import { Product, TransactionType } from '../../types';

type FormData = {
  name: string;
  brand: string;
  model: string;
  year?: number;
  price: number;
  description: string;
  condition: string;
  origin?: string;
  transactionType: TransactionType;
  commissionRate?: number;
  featured: boolean;
  status: 'available' | 'sold' | 'reserved';
};

const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<Record<string, string | number>>({});
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();
  
  const transactionType = watch('transactionType');
  
  // Mock data - would be replaced by API calls
  useEffect(() => {
    if (!isEditMode) {
      return;
    }
    
    // Simulate API call to get product details
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
        images: ['https://images.pexels.com/photos/6102167/pexels-photo-6102167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        condition: 'Nuevo',
        origin: 'China',
        transactionType: 'sale',
        status: 'available',
        featured: true,
        createdAt: '2023-10-15T10:30:00Z',
        updatedAt: '2023-10-15T10:30:00Z'
      };
      
      setProduct(mockProduct);
      setImages(mockProduct.images);
      setSpecifications(mockProduct.specifications);
      
      // Populate form fields
      Object.entries(mockProduct).forEach(([key, value]) => {
        if (key !== 'images' && key !== 'specifications' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          setValue(key as keyof FormData, value as any);
        }
      });
      
      setIsLoading(false);
    }, 800);
  }, [isEditMode, setValue, id]);
  
  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    
    // Create the complete product object
    const productData = {
      ...data,
      images,
      specifications,
      currency: 'USD' as const,
    };
    
    console.log('Product data to save:', productData);
    
    // Simulate API call to save product
    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin/products');
    }, 1000);
  };
  
  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecifications({
        ...specifications,
        [newSpecKey]: newSpecValue
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };
  
  const handleRemoveSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    setSpecifications(newSpecs);
  };
  
  const handleAddImage = () => {
    const url = prompt('Ingrese la URL de la imagen:');
    if (url && url.trim()) {
      setImages([...images, url.trim()]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/admin/products')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
        </div>
        
        <div className="flex space-x-2">
          {isEditMode && (
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 size={18} className="inline-block mr-2" />
              Eliminar
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Save size={18} className="inline-block mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">Información básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                {...register('name', { required: 'Este campo es obligatorio' })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca *
              </label>
              <input
                type="text"
                {...register('brand', { required: 'Este campo es obligatorio' })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modelo *
              </label>
              <input
                type="text"
                {...register('model', { required: 'Este campo es obligatorio' })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.model ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-500">{errors.model.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Año
              </label>
              <input
                type="number"
                {...register('year', {
                  valueAsNumber: true,
                  validate: (value) =>
                    !value || (value >= 1900 && value <= new Date().getFullYear()) || 'Año inválido'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio (USD) *
              </label>
              <input
                type="number"
                {...register('price', {
                  required: 'Este campo es obligatorio',
                  valueAsNumber: true,
                  validate: (value) => value > 0 || 'El precio debe ser mayor a 0'
                })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origen
              </label>
              <input
                type="text"
                {...register('origin')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condición *
              </label>
              <input
                type="text"
                {...register('condition', { required: 'Este campo es obligatorio' })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.condition ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.condition && (
                <p className="mt-1 text-sm text-red-500">{errors.condition.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de transacción *
              </label>
              <select
                {...register('transactionType', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="sale">Venta directa</option>
                <option value="trade">Permuta</option>
                <option value="consignment">Consignación</option>
              </select>
            </div>
            
            {transactionType === 'consignment' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comisión (%)
                </label>
                <input
                  type="number"
                  {...register('commissionRate', {
                    valueAsNumber: true,
                    validate: (value) =>
                      !value || (value >= 0 && value <= 100) || 'Porcentaje inválido (0-100)'
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.commissionRate && (
                  <p className="mt-1 text-sm text-red-500">{errors.commissionRate.message}</p>
                )}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado *
              </label>
              <select
                {...register('status', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="available">Disponible</option>
                <option value="reserved">Reservado</option>
                <option value="sold">Vendido</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Destacar en página principal
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">Descripción</h2>
          
          <div>
            <textarea
              rows={5}
              {...register('description', { required: 'Este campo es obligatorio' })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Especificaciones</h2>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                placeholder="Característica"
                className="w-40 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                placeholder="Valor"
                className="w-40 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddSpecification}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          {Object.keys(specifications).length === 0 ? (
            <p className="text-gray-500 italic">No hay especificaciones agregadas.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecification(key)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Imágenes</h2>
            
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <ImagePlus size={18} className="inline-block mr-2" />
              Agregar imagen
            </button>
          </div>
          
          {images.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
              <ImagePlus size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No hay imágenes agregadas.</p>
              <p className="text-gray-500 text-sm mt-2">
                Haga clic en "Agregar imagen" para incluir fotos del producto.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductEditPage;