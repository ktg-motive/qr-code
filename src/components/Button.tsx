import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-la-ai-400 focus:ring-offset-2';
  const variants = {
    primary: 'bg-la-ai-500 text-white hover:bg-la-ai-600 disabled:bg-gray-300 disabled:text-gray-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-la-ai-500 text-la-ai-600 hover:bg-la-ai-50 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
