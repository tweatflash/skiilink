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
      className="group cursor-pointer bg-white rounded-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative py-4  overflow-hidden hrpi flex flex-col gap-4 sm:gap-6">
        <img
          src={category.image}
          alt={category.name}
          className="w-[85%] xsmall:w-[70%] aspect-square object-contain  m-auto transition-transform duration-300"
        />
        <div className="absolute inset-0 "></div>
        <div className=" w-full text-black ">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {/* {IconComponent && <IconComponent size={24} />} */}
            <h3 className="text-lg  text-center">{category.name}</h3>
          </div>
          {/* <p className="text-sm opacity-90 text-center">{category.productCount} products</p> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;