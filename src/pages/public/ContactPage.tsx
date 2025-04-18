import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import ContactForm from '../../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Contáctenos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-gray-600"
          >
            Estamos aquí para responder cualquier consulta sobre nuestros productos y servicios. 
            Contáctenos y un representante se comunicará con usted a la brevedad.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="bg-green-600 py-6 px-6">
                <h3 className="text-xl font-bold text-white">Información de contacto</h3>
              </div>
              
              <div className="py-8 px-6 space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Dirección</h4>
                    <p className="text-gray-600">Ruta 30, km 569, Artigas, Uruguay</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Teléfono</h4>
                    <p className="text-gray-600">
                      <a href="https://wa.me/59899436421" className="hover:text-green-600 transition-colors">
                        +598 9943 6421
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:agrofierrosartigas@gmail.com" className="hover:text-green-600 transition-colors">
                        agrofierrosartigas@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Horario de atención</h4>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 - 18:00</p>
                    <p className="text-gray-600">Sábados: 8:00 - 12:00</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Síguenos en redes sociales</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.facebook.com/share/19JEW8iLjh/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Facebook size={24} />
                    </a>
                    <a 
                      href="https://www.instagram.com/agrofierrosartigas/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-800 py-6 px-6">
                <h3 className="text-xl font-bold text-white">Envíenos un mensaje</h3>
              </div>
              
              <div className="p-6">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestra ubicación</h2>
          <div className="h-96 bg-gray-200 rounded-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54938.29033986508!2d-56.5061615!3d-30.452542499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9461c8f9c06f4281%3A0xdefe4d60165946ea!2sArtigas%2C%20Uruguay!5e0!3m2!1sen!2sus!4v1653669052742!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Agronegocios Artigas"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;