import React from 'react';
import { Category } from '../types/product';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            {IconComponent && <IconComponent size={24} />}
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
          <p className="text-sm opacity-90">{category.productCount} products</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;