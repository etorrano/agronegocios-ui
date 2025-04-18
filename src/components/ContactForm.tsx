import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Check } from 'lucide-react';
import api from '../utils/api';

type FormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  productId?: string;
};

type ContactFormProps = {
  productId?: string;
  productName?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ productId, productName }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      subject: productName ? `Consulta sobre ${productName}` : '',
      productId: productId,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await api.post('/contact', data);
      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Hubo un error al enviar el mensaje. Por favor intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('name', { required: 'Este campo es obligatorio' })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register('phone')}
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Asunto *
            </label>
            <input
              id="subject"
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('subject', { required: 'Este campo es obligatorio' })}
            />
            {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje *
            </label>
            <textarea
              id="message"
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('message', {
                required: 'Este campo es obligatorio',
                minLength: {
                  value: 10,
                  message: 'El mensaje debe tener al menos 10 caracteres',
                },
              })}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Enviar mensaje
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="flex justify-center">
            <div className="bg-green-100 p-2 rounded-full">
              <Check size={40} className="text-green-600" />
            </div>
          </div>
          <h3 className="mt-4 text-xl font-medium text-gray-900">¡Mensaje enviado!</h3>
          <p className="mt-2 text-gray-600">
            Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Enviar otro mensaje
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;