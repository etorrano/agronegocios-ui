import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { NewsArticle } from '../types';

type NewsCardProps = {
  article: NewsArticle;
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formattedDate = format(new Date(article.createdAt), 'dd MMMM yyyy', { locale: es });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={article.coverImage || 'https://via.placeholder.com/400x200?text=No+Imagen'}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          to={`/noticias/${article.id}`}
          className="inline-block text-green-600 hover:text-green-800 font-medium transition-colors duration-300"
        >
          Leer más →
        </Link>
      </div>
    </motion.article>
  );
};

export default NewsCard;