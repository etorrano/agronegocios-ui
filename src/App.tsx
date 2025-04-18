import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import ContactPage from './pages/public/ContactPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import ProductEditPage from './pages/admin/ProductEditPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="productos/:id" element={<ProductDetailPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="products" element={<h1>Products List</h1>} />
          <Route path="products/:id" element={<ProductEditPage />} />
          <Route path="news" element={<h1>News List</h1>} />
          <Route path="messages" element={<h1>Messages</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;