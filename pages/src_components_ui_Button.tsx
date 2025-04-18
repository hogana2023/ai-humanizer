// src/components/ui/Button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  disabled = false,
  className = '',
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 disabled:text-blue-300 disabled:border-blue-300",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50 disabled:text-blue-300"
  };
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  return (
    <button
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
