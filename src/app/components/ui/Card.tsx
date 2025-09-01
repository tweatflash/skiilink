import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false, 
  padding = 'none' 
}) => {
  const paddingStyles = {
    none: '',
    sm: 'px-2',
    md: 'px-2',
    lg: 'px-2'
  };

  return (
    <div
      className={cn(
        ' ',
        hover && 'pb-0  relative card-overlay transition-all duration-300 hover:-translate-y-1',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;