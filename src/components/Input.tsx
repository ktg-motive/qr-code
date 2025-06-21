import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

export default function Input({ error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <input
        className={`w-full px-4 py-2 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-la-ai-400 focus:ring-offset-1 ${
          error 
            ? 'border-la-ai-red-400 focus:border-la-ai-red-500' 
            : 'border-gray-200 focus:border-la-ai-500 hover:border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-la-ai-red-500 flex items-center">
          <span className="w-1 h-1 bg-la-ai-red-500 rounded-full mr-2"></span>
          {error}
        </p>
      )}
    </div>
  );
}
