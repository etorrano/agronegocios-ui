import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Productos', path: '/productos' },
    { text: 'Servicios', path: '/servicios' },
    { text: 'Noticias', path: '/noticias' },
    { text: 'Contacto', path: '/contacto' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold tracking-tight">Agronegocios Artigas</span>
                </Link>
              </div>
            </div>
            
            {/* Desktop menu */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8 items-center">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'text-white font-bold border-b-2 border-white'
                      : 'text-green-100 hover:text-white hover:border-b-2 hover:border-green-100'
                  }`}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
            
            {/* Social icons - desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://www.facebook.com/share/19JEW8iLjh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/agrofierrosartigas/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/59899436421" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-200 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-600">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'bg-green-700 text-white'
                        : 'text-white hover:bg-green-700'
                    }`}
                  >
                    {item.text}
                  </Link>
                ))}
                
                {/* Social icons - mobile */}
                <div className="flex justify-center space-x-6 py-4">
                  <a 
                    href="https://www.facebook.com/share/19JEW8iLjh/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-200 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="https://www.instagram.com/agrofierrosartigas/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-200 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://wa.me/59899436421" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-200 transition-colors"
                  >
                    <Phone size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Agronegocios Artigas</h3>
              <p className="text-green-300">
                Especialistas en maquinaria agrícola y servicios para el agronegocio.
              </p>
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://www.facebook.com/share/19JEW8iLjh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/agrofierrosartigas/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-white transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-green-300 hover:text-white transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-green-300">
                <li className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <a href="https://wa.me/59899436421" className="hover:text-white">
                    +598 9943 6421
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <a href="mailto:agrofierrosartigas@gmail.com" className="hover:text-white">
                    agrofierrosartigas@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-400 text-sm">
              © {new Date().getFullYear()} Agronegocios Artigas. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;